import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@components/core-components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from '../../components/core-components/main-nav/main-nav.component';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { CustomerMainComponent } from '@components/menu-components/customer/customer-main/customer-main.component';
import { SupplierMainComponent } from '@components/menu-components/supplier/supplier-main/supplier-main.component';

// import { TrimStringPipe } from 'src/app/core/pipes/trim-string.pipe';
const routes: Routes = [
  { path: '', redirectTo: '/layout', pathMatch: 'full' },
  {
    path: 'layout', component: LayoutComponent,
    children: [
      { path: 'customer', component: CustomerMainComponent, loadChildren: () => import('@modules/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'supplier', component: SupplierMainComponent, loadChildren: () => import('@modules/supplier/supplier.module').then(m => m.SupplierModule) },
    ]
  },
  { path: '**', redirectTo: '/layout', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class PuRoutingCoreModule { }

@NgModule({
  declarations: [
    LayoutComponent,
    MainNavComponent,
  ],
  imports: [
    CommonModule,
    PuRoutingCoreModule,
    // TrimStringPipe
  ],
  providers: [
    MetadataService,
    DynamicGridService
  ],
  exports: [
    MainNavComponent
  ]
})
export class PuCoreModule { }