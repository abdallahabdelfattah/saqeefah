import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsListComponent } from './clientInterest/contact-us-list/contact-us-list.component';
import { FeedbackListComponent } from './clientInterest/feedback-list/feedback-list.component';
import { PlaceOrderComponent } from './clientInterest/place-order/place-order.component';

import { DashboardComponent } from './dashboard.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ProjectsComponent } from './projects/projects.component';
import { PropertyComponent } from './property/property.component';
import { AreaRangeComponent } from './setting/pages/area-range/area-range.component';
import { HomeSliderBannerComponent } from './setting/pages/home-slider-banner/home-slider-banner.component';
import { PartnerComponent } from './setting/pages/partner/partner.component';
import { PriceRangeComponent } from './setting/pages/price-range/price-range.component';
import { SettingComponent } from './setting/pages/setting.component';

import { WebsiteInfoComponent } from './setting/pages/website-info/website-info.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';
import { VillasComponent } from './villas/villas.component';
import { EditVillaComponent } from './edit-villa/edit-villa.component';

const routes: Routes = [
  {
   path:'',
    component: DashboardComponent,


  children:[
    { path: '',
     redirectTo: '',
      pathMatch: 'full',
     //path:'homebannar',
      component:HomeSliderBannerComponent
    },
    {
      path:'user',
      component: UsersComponent
    },
    {
      path:'settings',
      component: SettingComponent
    },
    {
      path:'projects',
      component: ProjectsComponent
    },
    {
      path:'Appartments',
      component: PropertyComponent
    },
    {
      path:'edit-project/:id',
      component: EditProjectComponent
    },
    {
      path:'villas',
      component: VillasComponent
    },
    {
      path:'edit-villa/:projectId/:villaId',
      component: EditVillaComponent
    },

    {
      path:'edit-property/:projectId/:propertyId',
      component: EditPropertyComponent
    },
    {
      path:'test',
      component: TestComponent
    },

    {path:'partner',
    component:PartnerComponent

    },
    {path:'websiteInfo',
    component:WebsiteInfoComponent,

    },
    {path:'priceRange',
    component:PriceRangeComponent,

    },
    {path:'areaRange',
    component:AreaRangeComponent,

    },
    {
      path:'contactlist',
      component:ContactUsListComponent
    },
    {
      path:'feedbacklist',
      component:FeedbackListComponent
    },
    {
      path:'placeOrder',
      component:PlaceOrderComponent
    },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
