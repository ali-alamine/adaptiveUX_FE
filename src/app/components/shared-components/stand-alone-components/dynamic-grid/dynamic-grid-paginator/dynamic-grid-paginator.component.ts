import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gridItemPerPageOpt } from 'src/app/models/grid';
import { GridHelper } from '../gridHelper.service';
import { PUObject } from 'src/app/models/shared';
import { skip, takeUntil } from 'rxjs';
@Component({
  selector: 'pu-dynamic-grid-paginator',
  templateUrl: './dynamic-grid-paginator.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./dynamic-grid-paginator.component.scss']
})
export class DynamicGridPaginatorComponent extends PUObject {

  constructor(@SkipSelf() public gridHelper: GridHelper) {
    super();
    this.getTotalRecords();
    this.currentPage = this.gridHelper.selectedCurrentPage$.getValue();
  }

  _selectedItemPerPage: number = this.gridHelper.selectedItemsPerPage$.getValue();
  currentPage!: number;
  gridItemPerPageOpt: any = gridItemPerPageOpt;
  totalPages!: number;

  ngOnInit() {

  }

  getTotalRecords() {
    this.gridHelper.totalRecords$.pipe(takeUntil(this.ngUnsubscribe), skip(1))
      .subscribe((totalRecords: number) => {
        this.totalPages = this.getTotalPages(totalRecords, this.gridHelper.selectedItemsPerPage$.getValue());
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages
        }
      })
  }

  selectItemPerPage(newItemsPerPage: any) {
    this.gridHelper.removeFocusedElement();
    const currentRecordIndex = (this.currentPage - 1) * this.gridHelper.selectedItemsPerPage$.getValue() + 1;
    let newPage = Math.ceil(currentRecordIndex / newItemsPerPage);

    this.totalPages = this.getTotalPages(this.gridHelper.totalRecords$.getValue(), newItemsPerPage);

    if (newPage > this.totalPages) {
      newPage = this.totalPages;
    }

    this.gridHelper.selectedItemsPerPage$.next(newItemsPerPage);
    this.currentPage = newPage

    this.gridHelper.selectedCurrentPage$.next(this.currentPage);
    this.gridHelper.updateGridQueryParams();
    this.gridHelper.showContextMenu$.next(false);

  }
  getTotalPages(totalRecords: number, itemsPerPage: number) {
    return Math.ceil(totalRecords / itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.gridHelper.showContextMenu$.next(false);
      this.currentPage--;
      this.gridHelper.selectedCurrentPage$.next(this.currentPage);
      this.gridHelper.updateGridQueryParams();

    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.gridHelper.showContextMenu$.next(false);
      this.currentPage++;
      this.gridHelper.selectedCurrentPage$.next(this.currentPage);
      this.gridHelper.updateGridQueryParams();
    }
  }

}