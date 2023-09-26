import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierMainComponent } from '@components/menu-components/supplier/supplier-main/supplier-main.component';
import { DynamicGridComponent } from '@components/shared-components/stand-alone-components/dynamic-grid/dynamic-grid.component';


@NgModule({
  declarations: [
    SupplierMainComponent
  ],
  imports: [
    CommonModule,
    DynamicGridComponent
  ]
})
export class SupplierModule { }
