import { ElementRef, Injectable, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { BehaviorSubject, skip, takeUntil, tap } from 'rxjs';
import { fillFiltersValue } from 'src/app/models/grid';
import { PUObject } from 'src/app/models/shared';
import * as XLSX from 'xlsx';
import * as bootstrap from 'bootstrap';
@Injectable({
  providedIn: 'root'
})
export class GridHelper extends PUObject {

  private renderer!: Renderer2;

  //grid
  gridAttr$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  gridRows$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  searchParams$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  sortParams$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  contendID$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  //Paginator
  selectedItemsPerPage$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  selectedCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  gridQueryParams$: BehaviorSubject<any> = new BehaviorSubject<any>([{
    "queries": [], "sortBy": [], 'gridID': this.contendID$.getValue(),
    itemsPerPage: this.selectedItemsPerPage$.getValue(), currentPage: this.selectedCurrentPage$.getValue()
  }]);

  //ContextMenu
  showContextMenu$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contextMenuPos$: BehaviorSubject<any> = new BehaviorSubject<any>({ x: "", y: "" });
  selectedContextMenuAction$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  contextMenuActions$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  targetRecord$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  newRecordData$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  fillFiltersValue: Function = fillFiltersValue;
  copyFieldKey$: BehaviorSubject<any> = new BehaviorSubject<any>({ field_key: "", i: "" });

  //Styling
  gridCssClasses$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  gridRef$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  //Create Form
  isCreateFormVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fetchableFormAttributesValues$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  //Shared
  attributes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);


  constructor(rendererFactory: RendererFactory2) {
    super();
    this.renderer = rendererFactory.createRenderer(null, null);

    this.gridAttr$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (attributes: any) => {
        attributes = this.fillFiltersValue(attributes, this.gridQueryParams$.getValue());
      }
    )
  }

  exportToExcel(data: any[], fileName: string, sheetName: string = ''): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  openPopup() {
    this.isCreateFormVisible$.next(true);
  }

  closePopup() {
    this.isCreateFormVisible$.next(false);
  }

  highlightCopiedValue() {
    let cellId = this.copyFieldKey$.getValue().field_key + this.copyFieldKey$.getValue().i;
    let cellEl: any = document.getElementById(cellId);
    cellEl.classList.add('pu-highlight-text');
    setTimeout(() => {
      cellEl.classList.remove('pu-highlight-text');
    }, 400);

  }

  toggleGridClass(iconClasses: any, i: any) {
    console.log(iconClasses.gridClass, '>>>>>>>> iconClasses.gridClass <<<<<<<')
    let gridClasses: any = Array.from(this.gridRef$.getValue()?.nativeElement?.classList);
    if (gridClasses.includes(iconClasses.gridClass)) {
      this.gridRef$.getValue().nativeElement.classList.remove(iconClasses.gridClass);

    } else {
      this.gridRef$.getValue().nativeElement.classList.add(iconClasses.gridClass);
      this.gridRef$.getValue().nativeElement.classList.remove(iconClasses.removeClass);
    }

    gridClasses = Array.from(this.gridRef$.getValue()?.nativeElement?.classList);
    this.gridCssClasses$.next(gridClasses);

  }

  hideContextMenu() {
    if (this.showContextMenu$.getValue()) {
      this.showContextMenu$.next(false);
    }
  }
  saveFocusedElement() {
    const focusedElement = this.renderer.selectRootElement(document.activeElement);
    if (focusedElement && focusedElement.id) {
      localStorage.setItem('focusedElementId', focusedElement.id);
    }
  }

  restoreFocusedElement() {
    const focusedElementId = localStorage.getItem('focusedElementId');
    if (focusedElementId) {
      const focusedElement = this.renderer.selectRootElement(`#${focusedElementId}`);
      if (focusedElement) {
        focusedElement.focus();
      }
    }
  }

  removeFocusedElement() {
    localStorage.removeItem('focusedElementId');
  }

  updateGridQueryParams() {
    this.gridQueryParams$.next([{
      "queries": this.searchParams$.getValue(), "sortBy": this.sortParams$.getValue(), 'gridID': this.contendID$.getValue(),
      "itemsPerPage": this.selectedItemsPerPage$.getValue(), currentPage: this.selectedCurrentPage$.getValue()
    }]);
  }

  initToolTip() {
    setTimeout(() => {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((tooltipTriggerEl: any) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });

    }, 1000);
  }

}
