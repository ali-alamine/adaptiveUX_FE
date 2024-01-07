import { CommonModule } from '@angular/common';
import { Component, SkipSelf } from '@angular/core';
import { GridHelper } from '../gridHelper.service';
import { BehaviorSubject, skip, take, takeUntil } from 'rxjs';
import { PUObject } from 'src/app/models/shared';

@Component({
  standalone: true,
  selector: 'pu-dynamic-grid-action-header',
  templateUrl: './dynamic-grid-action-header.component.html',
  styleUrls: ['./dynamic-grid-action-header.component.scss'],
  imports: [CommonModule]
})
export class DynamicGridActionHeaderComponent extends PUObject {
  gridStyleOptions: Array<any> = [
    { id: 1, iconClass: 'fa-border-none', gridClass: 'table-borderless', removeClass: 'table-bordered' },
    { id: 2, iconClass: 'fa-border-all', gridClass: 'table-bordered', removeClass: 'table-borderless' },
    { id: 3, iconClass: 'fa-maximize', gridClass: 'table-maximize' },
    // { id: 4, iconClass: 'fa-grip-lines', gridClass: '' },  
  ]
  constructor(@SkipSelf() public gridHelper: GridHelper) {
    super();
    setTimeout(() => {

      this.gridHelper.gridRef$.pipe(takeUntil(this.ngUnsubscribe), take(1)).subscribe(
        (data: any) => {
          const gridClasses: any = Array.from(data?.nativeElement?.classList);
          this.gridHelper.gridCssClasses$.next(gridClasses)
        }
      )
    });
  }

  ngAfterViewInit() {
  }

  exportToExcel() {
    let data: Array<any> = this.gridHelper.gridRows$.getValue();
    this.gridHelper.exportToExcel(data, 'test2')
  }

}
