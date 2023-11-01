import { Component, SkipSelf } from '@angular/core';
import { DynamicGridComponent } from '@components/shared-components/stand-alone-components/dynamic-grid/dynamic-grid.component';
import { GridHelper } from '@components/shared-components/stand-alone-components/dynamic-grid/gridHelper.service';
import * as _ from 'lodash';
import { skip, takeUntil } from 'rxjs';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { GRID_CONTEXTMENU, restructureGridData, extractGridAttributes, getContextMenuActions } from 'src/app/models/grid';
import { PUObject, copyToClipboard } from 'src/app/models/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { ATTR_TYPE, restructureDataForList } from 'src/app/models/shared';
@Component({
  selector: 'pu-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  standalone: true,
  styleUrls: ['./dynamic-content.component.scss'],
  imports: [DynamicGridComponent]
})
export class DynamicContentComponent extends PUObject {
  private readonly GRID_CONTEXTMENU = GRID_CONTEXTMENU;
  public readonly ATTR_TYPE = ATTR_TYPE;
  restructureGridData: Function = restructureGridData;
  extractGridAttributes: Function = extractGridAttributes;
  restructureDataForList: Function = restructureDataForList;
  routerData: any = this.router.snapshot.data;
  constructor(public router: ActivatedRoute, @SkipSelf() private gridService: DynamicGridService, @SkipSelf() public gridHelper: GridHelper) {
    super();
    this.gridHelper.contendID$.next(this.routerData.contentID);

  }

  ngOnInit() {
    this.fetchGridFilters();
    this.contextMenuSelection();
    this.addNewGridRecord();
    this.fetchFormFieldsValues();
  }

  fetchGridFilters() {
    this.gridHelper.gridQueryParams$.subscribe(
      {
        next: (params: any) => {
          this.filterGrid(params);
        },
        error: (error: any) => { }
      }
    )
  }

  fetchFormFieldsValues() {
    this.gridHelper.isCreateFormVisible$.subscribe(
      {
        next: (isVisible: boolean) => {
          if (isVisible) {
            let fetchableAttributes: Array<any> = this.gridHelper.attributes$.getValue()
              .filter((attr: any) => attr?.attr_fetch_value !== null && attr.in_form == 1)
              .map((attr: any) => attr?.attr_fetch_value?.fetch_criteria);

            let formData: FormData = new FormData();
            formData.append('data', JSON.stringify(fetchableAttributes));
            this.gridService.fetchFormFieldsValues('get_attr_values', formData).subscribe(
              {
                next: (data: any) => {

                  console.log(restructureDataForList(data), " >>> success <<<<")
                  this.gridHelper.fetchableFormAttributesValues$.next(restructureDataForList(data));
                },
                error: (error: any) => {
                  console.error(" *** Error *** ", error)
                }
              }
            )
          }
        }
      }
    )
  }

  filterGrid(params: any) {
    params[0].contentID = this.routerData.contentID;
    this.gridService.filterGridData('get_grid_data', params).subscribe(
      {
        next: (response: any) => {
          const gridData: Array<any> = restructureGridData(response?.gridData);
          this.gridHelper.gridAttr$.next(extractGridAttributes(response?.attributes).filter((attr: any) => attr.in_grid == 1));
          this.gridHelper.attributes$.next(extractGridAttributes(response?.attributes));
          this.gridHelper.gridRows$.next(_.cloneDeep(gridData));
          this.gridHelper.contextMenuActions$.next(getContextMenuActions(response?.content_actions));
          // this.gridHelper.contentID$.next(response.content_id);
          // this.gridHelper.totalRecords$.next(response.totalRecords);
          this.gridHelper.hideContextMenu();
          setTimeout(() => {
            this.gridHelper.restoreFocusedElement();
          }, 50);
        },
        error: (error: any) => {
          console.error(" *** Error *** ", error)
        }
      }
    )
  }

  addNewGridRecord() {
    this.gridHelper.newRecordData$.pipe(takeUntil(this.ngUnsubscribe), skip(1)).subscribe(
      (data: any) => {
        console.log(data, " >>> record data <<<<")
        this.gridService.addRecord('add_dynamicGrid_record', data).subscribe({
          next: (data: any) => {
            this.fetchGridFilters();
            this.gridHelper.isCreateFormVisible$.next(false);
          },
          error: (data: any) => { alert('something went wrong') }
        })
      }
    )
  }

  contextMenuSelection() {
    this.gridHelper.selectedContextMenuAction$.pipe(takeUntil(this.ngUnsubscribe), skip(1)).subscribe(
      (data: any) => {
        let actionKey: string = data?.action_key;
        this.gridHelper.hideContextMenu();
        switch (actionKey) {
          case GRID_CONTEXTMENU.DELETE:
            {
              let record: any = this.gridHelper.targetRecord$.getValue();
              console.log(record, " >>> record <<<<")
              let entityID: any = record[0].entity_id;
              let contentID: any = this.gridHelper.contendID$.getValue();
              let action_id: any = data.action_id;
              let formData: FormData = new FormData();
              formData.append('entityID', entityID);
              formData.append('contentID', contentID);
              formData.append('actionID', action_id);
              for(let i=0;i<record.length;i++){
                formData.append('record[]', JSON.stringify(record[i]));
              }

              this.gridService.deleteRecord('delete_record', formData).subscribe({
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
