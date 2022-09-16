import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ComponentsModule} from '../../components/components.module'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { PropertyComponent } from './property/property.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './navigator/footer/footer.component';
import { HeaderComponent } from './navigator/header/header.component';
import { SidebarComponent } from './navigator/sidebar/sidebar.component';
import { TopHeaderComponent } from './navigator/top-header/top-header.component';
import { SettingFormComponent } from './setting/components/setting-form/setting-form.component';
import { IconPickerModule } from 'ngx-icon-picker';
import { SettingComponent } from './setting/pages/setting.component';
import { PartnerComponent } from './setting/pages/partner/partner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { NgxEditorModule } from 'ngx-editor';
import { WebsiteInfoComponent } from './setting/pages/website-info/website-info.component';
import { FeedbackListComponent } from './clientInterest/feedback-list/feedback-list.component';
import { ContactUsListComponent } from './clientInterest/contact-us-list/contact-us-list.component';
import { DataTablesModule } from 'angular-datatables';
import { PlaceOrderComponent } from './clientInterest/place-order/place-order.component';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { GenaricService } from 'src/app/services/Genaric.service';
import { PriceRangeComponent } from './setting/pages/price-range/price-range.component';
import { PriceRangeService } from './setting/services/priceRange.service';
import { AreaRangeComponent } from './setting/pages/area-range/area-range.component';



@NgModule({
  declarations: [
    DashboardComponent,
            SettingComponent,
            SettingFormComponent,
            UsersComponent,
            ProjectsComponent,
            PropertyComponent,
            EditProjectComponent,
            EditPropertyComponent,
            TestComponent,
            HeaderComponent,
            SidebarComponent,
            FooterComponent,
            TopHeaderComponent,
            PartnerComponent,
            WebsiteInfoComponent,
            FeedbackListComponent,
            ContactUsListComponent,
            PlaceOrderComponent,
            PriceRangeComponent,
            AreaRangeComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    IconPickerModule,
    NgxSpinnerModule,
    NgxEditorModule,
    DataTablesModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      extend: true
  }),
    // TranslateModule.forChild({
    //   loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    //   extend: true
    // }),
    // TranslateModule.forRoot({
    //   defaultLanguage: "ar",
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]

    //   }
    // }),
    // TranslateModule.forChild(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,

    })

  ],
  providers:[{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
             {provide:HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true},
             changeLanguageService, GenaricService,PriceRangeService
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule {
  /**
   *
   */
  constructor( private language:changeLanguageService,private translate: TranslateService) {
   this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
  //   let l =this.language.getCurrentLanguage();
  //   this.language.changeLanguge(l);
  //  this.translate.use(l);
  });
  }
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}
