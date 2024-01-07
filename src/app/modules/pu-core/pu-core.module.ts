import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@components/core-components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from '../../components/core-components/main-nav/main-nav.component';
import { MetadataService } from 'src/app/core/services/singleton/metadata.service';
import { DynamicGridService } from 'src/app/core/services/grid/dynamic-grid.service';
import { DynamicContentComponent } from '@components/core-components/dynamic-content/dynamic-content.component';
import { RouterService } from 'src/app/core/services/singleton/router.service';
import { FeedbackNotificationComponent } from '@components/shared-components/notification/feedback-notification/feedback-notification.component';
import { Router, Route } from '@angular/router';
import { skip, take } from 'rxjs';


const routes: Routes = [
  { path: '', redirectTo: '/layout', pathMatch: 'full' },
  {
    path: 'layout', component: LayoutComponent
  },
  { path: '**', redirectTo: '/layout', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [

  ]
})

export class PuRoutingCoreModule {
  components: any = [
    LayoutComponent,
    MainNavComponent,
    DynamicContentComponent
  ]

  constructor(public router: Router, private metadataService: MetadataService) {
    // this.metadataService

    const apiRoutes: any = [];
    this.metadataService.routes$.pipe(skip(1), take(1)).subscribe(
      (routesData: any) => {
        console.log('here we go')

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

@NgModule({
  declarations: [
    LayoutComponent,
    MainNavComponent,
    FeedbackNotificationComponent
  ],
  imports: [
    CommonModule,
    PuRoutingCoreModule,
    DynamicContentComponent
  ],
  providers: [
    MetadataService,
    DynamicGridService,
    RouterService
  ],
  exports: [
    MainNavComponent
  ]
})
export class PuCoreModule { }