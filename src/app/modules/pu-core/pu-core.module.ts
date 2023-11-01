<<<<<<< HEAD
import { Component, NgModule } from '@angular/core';
=======
import { NgModule } from '@angular/core';
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@components/core-components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from '../../components/core-components/main-nav/main-nav.component';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
<<<<<<< HEAD
import { DynamicContentComponent } from '@components/core-components/dynamic-content/dynamic-content.component';
import { RouterService } from 'src/app/core/services/singleton/router.service';

import { Router, Route } from '@angular/router';
import { skip } from 'rxjs';


const routes: Routes = [
  { path: '', redirectTo: '/layout', pathMatch: 'full' },
  {
    path: 'layout', component: LayoutComponent
=======
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
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
  },
  { path: '**', redirectTo: '/layout', pathMatch: 'full' }
];

<<<<<<< HEAD


=======
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
<<<<<<< HEAD

export class PuRoutingCoreModule {
  components: any = [
    LayoutComponent,
    MainNavComponent,
    DynamicContentComponent
  ]

  constructor(public router: Router, private metadataService: MetadataService) {
    this.metadataService

    const apiRoutes: any = [];
    this.metadataService.routes$.pipe(skip(1)).subscribe(
      (routesData: any) => {
        // console.log(routesData, ">>>>>  routes  <<<<<<");

        for (let i = 0; i < routesData.length; i++) {
          let route: any = {
            'path': routesData[i].primary_route_path,
            'component': DynamicContentComponent,
            'data': {
              contentID: routesData[i].content_id
            }
          }
          apiRoutes.push(route);
        }



        const dynamicRoutes: any = [
          { path: '', redirectTo: '/layout', pathMatch: 'full' },
          {
            path: 'layout', component: LayoutComponent,
            children: apiRoutes
          },
          { path: '**', redirectTo: '/layout', pathMatch: 'full' }


        ]

        this.router.resetConfig([
          ...dynamicRoutes
        ]);
      }
    )

  }
}
=======
export class PuRoutingCoreModule { }
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e

@NgModule({
  declarations: [
    LayoutComponent,
    MainNavComponent,
  ],
  imports: [
    CommonModule,
    PuRoutingCoreModule,
<<<<<<< HEAD
    DynamicContentComponent
  ],
  providers: [
    MetadataService,
    DynamicGridService,
    RouterService
=======
    // TrimStringPipe
  ],
  providers: [
    MetadataService,
    DynamicGridService
>>>>>>> 8824036171a896ab31ac98ca476ad080a7e08b5e
  ],
  exports: [
    MainNavComponent
  ]
})
export class PuCoreModule { }