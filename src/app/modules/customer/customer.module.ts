import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMainComponent } from '@components/menu-components/customer/customer-main/customer-main.component';
import { DynamicGridComponent } from '@components/shared-components/stand-alone-components/dynamic-grid/dynamic-grid.component';
@NgModule({
  declarations: [
    CustomerMainComponent
  ],
  imports: [
    CommonModule,
    DynamicGridComponent,
  ],
  exports: [
  ]
})
export class CustomerModule { }