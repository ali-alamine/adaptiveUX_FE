import { Component, Self, SkipSelf } from '@angular/core';
import { skip, takeUntil } from 'rxjs';
import { GRID_CONTEXTMENU } from 'src/app/models/grid';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { GridHelper } from '@components/shared-components/stand-alone-components/dynamic-grid/gridHelper.service';
import { PUObject, copyToClipboard } from 'src/app/models/shared';

@Component({
  selector: 'pu-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
  providers: [GridHelper]
})

export class CustomerMainComponent extends PUObject {
  GRID_CONTEXTMENU: any = GRID_CONTEXTMENU;

  constructor(@SkipSelf() private gridService: DynamicGridService, @Self() public gridHelper: GridHelper) {
    super();
  }

  ngOnInit() {
    this.fetchGridFilters();
    this.contextMenuSelection();
    this.addNewCustomer();
  }

  filterCustomers(params: any = {}) {
    this.gridService.filterGridData('filter_customers', params)
      .subscribe(
        {
          next: (response: any) => {
            this.gridHelper.gridCols$.next(response.columnNames);
            this.gridHelper.gridRows$.next(response.grid_data);
            this.gridHelper.totalRecords$.next(response.totalRecords);
            this.gridHelper.hideContextMenu();
            setTimeout(() => {
              this.gridHelper.restoreFocusedElement()
            }, 50);
          },
          error: (error: any) => {
            console.log(error, ">>>>>>>>>>>> error");
          }
        }
      )
  }

  fetchGridFilters() {
    this.gridHelper.gridQueryParams$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (params: any) => {
        this.filterCustomers(params);
      }
    )
  }

  addNewCustomer() {
    this.gridHelper.newRecordData$.pipe(takeUntil(this.ngUnsubscribe), skip(1)).subscribe(
      (data: any) => {
        this.gridService.addRecord('add_customer', data).subscribe({
          next: (data: any) => {
            this.fetchGridFilters();
            this.gridHelper.isPopupVisible$.next(false);
          },
          error: (data: any) => { alert('something went wrong') }
        })
      }
    )
  }

  contextMenuSelection() {
    this.gridHelper.contextMenuAction$.pipe(takeUntil(this.ngUnsubscribe), skip(1)).subscribe(
      (data: any) => {
        let actionId: string = data?.key;
        this.gridHelper.hideContextMenu();
        switch (actionId) {
          case GRID_CONTEXTMENU.DELETE:
            {
              let record: any = this.gridHelper.targetRecord$.getValue();
              let formData: FormData = new FormData();
              formData.append('person_id', record.person_id);
              this.gridService.deleteRecord('delete_customer', formData).subscribe({
                next: (data) => {
                  this.fetchGridFilters();
                },
                error: (data: any) => {
                  alert('Something went wrong')
                }
              });
            }
            break;
          case GRID_CONTEXTMENU.PIN:
            {
              let record: any = this.gridHelper.targetRecord$.getValue();
              let formData: FormData = new FormData();
              formData.append('person_id', record.person_id)
              this.gridService.pinRecord('pin_customer', formData).subscribe({
                next: (data: any) => {
                  this.fetchGridFilters();
                },
                error: (data: any) => {
                  alert('Something went wrong')
                }
              })
            }
            break;
          case GRID_CONTEXTMENU.COPY:
            {
              let record: any = this.gridHelper.targetRecord$.getValue();
              let field_key = this.gridHelper.copyFieldKey$.getValue().field_key;
              let copyFieldValue = record[field_key];
              if (copyToClipboard(copyFieldValue)) {
                this.gridHelper.highlightCopiedValue();
              }
              break;
            }
          case GRID_CONTEXTMENU.UNPIN:
            {
              let record: any = this.gridHelper.targetRecord$.getValue();
              this.gridService.unPinRecord('unpin_customer', record).subscribe({
                next: (data: any) => {
                  this.gridHelper.updateGridQueryParams()
                }
              })
            }

            break;
        }
      }
    )
  }
}
