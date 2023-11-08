import { Component, ElementRef, ViewChild, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimStringPipe } from 'src/app/core/pipes/trim-string.pipe';
import { DynamicGridActionHeaderComponent } from './dynamic-grid-action-header/dynamic-grid-action-header.component';
import { FormsModule } from '@angular/forms';
import { GridHelper } from './gridHelper.service';
import { DynamicGridPaginatorComponent } from './dynamic-grid-paginator/dynamic-grid-paginator.component';
import * as _ from 'lodash';
import { DynamicGridContextMenuComponent } from './dynamic-grid-context-menu/dynamic-grid-context-menu.component';
import { takeUntil } from 'rxjs';
import { PUObject } from 'src/app/models/shared';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { DynamicGridCreateFormComponent } from './dynamic-grid-create-form/dynamic-grid-create-form.component';
@Component({
  selector: 'pu-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule, TrimStringPipe, DynamicGridActionHeaderComponent,
    DynamicGridCreateFormComponent, DynamicGridPaginatorComponent,
    DynamicGridContextMenuComponent, FormsModule]
})

export class DynamicGridComponent extends PUObject {
  selectedColumnIndex: number = -1;
  selectedRowIndex: number = -1;
  sortedField_key: string = '';
  sortIcon: string = '';
  sortType: string = 'DESC';
  itemsPerPage!: number;
  @ViewChild('grid', { static: true }) grid!: ElementRef;
  public debouncedSearchColumn = _.debounce(this.searchColumn.bind(this), 500);
  radio: any = 'radio';
  constructor(@SkipSelf() public gridHelper: GridHelper, @SkipSelf() private gridService: DynamicGridService) {
    super();
  }

  ngOnInit() {
    this.gridHelper.removeFocusedElement();
    this.gridHelper.gridAttr$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (cols: any) => {
        this.selectedRowIndex = -1;
        this.gridHelper.initToolTip();
      }
    )
  }

  ngAfterViewInit() {
    this.gridHelper.gridRef$.next(this.grid);
  }

  searchColumn(field_key: string, query: any) {
    this.gridHelper.saveFocusedElement();

    let newParam: any = { field_key: field_key, query: query };
    const existingParams: any = this.gridHelper.searchParams$.getValue();
    for (let i = 0; i < existingParams.length; i++) {
      if (existingParams[i].field_key == field_key) {
        existingParams.splice(i, 1);
      }
    }

    if (query != '' && query != null) {
      existingParams.push(newParam)
    }
    this.gridHelper.searchParams$.next(existingParams);
    this.gridHelper.updateGridQueryParams();
  }

  sortColumn(columnIndex: number, field_key: string) {
    // window.open('http://localhost:4200/layout/supplier', 'window name', 'toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400');
    this.gridHelper.removeFocusedElement();
    this.selectedColumnIndex = columnIndex;

    if (this.sortedField_key != field_key) {
      this.sortType = 'ASC';
    }
    if (this.sortType === 'ASC') {
      this.sortType = 'DESC';
    } else if (this.sortType === 'DESC') {
      this.sortType = 'ASC';
      // this.sortType = 'NONE';
    } else {
      this.sortType = 'ASC';
    }

    this.sortedField_key = field_key;

    let newParam: any = this.sortType !== 'NONE' ? [{ field_key: field_key, sort_type: this.sortType }] : []
    this.gridHelper.sortParams$.next(newParam);
    this.gridHelper.updateGridQueryParams();

    this.gridHelper.hideContextMenu();
  }

  unPinRecord(row: any) {
    this.gridService.unPinRecord('unpin_customer', row).subscribe({
      next: (data: any) => {
        this.gridHelper.updateGridQueryParams()
      }
    })
  }

  onRowContextMenu(e: any, record: any, rowIndex: number) {
    e.preventDefault();
    this.selectedRowIndex = rowIndex;
    this.gridHelper.showContextMenu$.next(true);
    this.gridHelper.contextMenuPos$.next({ x: e.clientX, y: e.clientY });
    this.gridHelper.targetRecord$.next(record);
  }

  onCellContextMenu(e: any, CopyFieldKey: any, i: number, cell: any) {
    e.preventDefault();
    cell.id = CopyFieldKey + i;
    this.gridHelper.copyFieldKey$.next({ field_key: CopyFieldKey, i: i });
  }

  selectRow(i: number) {
    if (this.selectedRowIndex == i) {
      this.selectedRowIndex = -1;
    } else {

      this.selectedRowIndex = i;
    }
    this.gridHelper.showContextMenu$.next(false);
  }

  showPinnedRecords(isPinned: any, filedOrder: any) {
    if (isPinned == 1 && filedOrder == 0) {
      // console.log(isPinned)
      return this.gridHelper.gridQueryParams$.value[0].queries.length == 0 && this.gridHelper.gridQueryParams$.value[0].sortBy.length == 0 && this.gridHelper.gridQueryParams$.value[0].currentPage == 1
    }
    return false
  }

  override ngOnDestroy() {
    this.gridHelper.removeFocusedElement();
  }
}