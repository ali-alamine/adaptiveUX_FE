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
    { id: 1, iconClass: 'fa-border-all', gridClass: 'table-bordered', removeClass: 'table-borderless' },
    // { id: 1, iconClass: 'fa-grip-lines', gridClass: '' },  
    { id: 1, iconClass: 'fa-maximize', gridClass: 'table-maximize' },
  ]
  constructor(@SkipSelf() public gridHelper: GridHelper) {
    super();
    setTimeout(() => {

      this.gridHelper.gridRef$.pipe(takeUntil(this.ngUnsubscribe), take(1)).subscribe(
        (data: any) => {
          const gridClasses: any = Array.from(data?.nativeElement?.classList);
<<<<<<< HEAD
=======
          console.log(gridClasses, ">> FIRST LOAD <<")
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
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
