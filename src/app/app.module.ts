import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { changeLanguageService } from './services/changeLanguage.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TopHeaderComponent } from './layout/header/top-header/top-header.component';
import { AboutSectionComponent } from './pages/home/about-section/about-section.component';
import { RecentListComponent } from './pages/home/recent-list/recent-list.component';
import { ParallaxComponent } from './pages/home/parallax/parallax.component';
import { SearchComponent } from './pages/search/search.component';
import { GenaricService } from './services/Genaric.service';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CompareComponent } from './pages/compare/compare.component';
import { OverviewComponent } from './pages/project-details/overview/overview.component';
import { BuildingsComponent } from './pages/project-details/buildings/buildings.component';
import { SpecsComponent } from './pages/project-details/specs/specs.component';
import { ProjectAndListService } from './services/project-lists.service';
import { FavoritesService } from './services/favorites.service';
import { CompareService } from './services/compare.service';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BuildingComponent } from './pages/building/building.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { TestService } from './pages/dashboard/services/test.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { UserlayoutModule } from './pages/userSite/userlayout/userlayout.module';
import { PropertiesComponent } from './pages/properties/properties.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { LoadingInterceptor } from './pages/dashboard/Interceptor/loading.interceptor';
import { ErrorInterceptor } from './pages/dashboard/Interceptor/error.interceptor';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthGuard } from './shared/services/auth.guards';
import { AttachmentService } from './pages/dashboard/services/attachment.service';
import { siteInformationService } from './shared/services/siteInformation.service';
import { PlaceOrderService } from './services/placeOrder.service';
import { SiteInformationSharedService } from './services/site-information-shared.service';
import { AllSettingSharedService } from './services/all-setting-shared.service';
import { UsagePolicyComponent } from './pages/usage-policy/usage-policy.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopHeaderComponent,
    PropertiesComponent,
    UsagePolicyComponent,
 
  
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    // UserlayoutModule,
    DashboardModule,
    NgxSpinnerModule,
    // LoginModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "ar",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      },isolate:false
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    
    BrowserAnimationsModule,
  ],
  providers: [changeLanguageService, GenaricService,ProjectAndListService,
    FavoritesService,CompareService,AuthService,TestService,AuthGuard,AttachmentService,
    siteInformationService,PlaceOrderService,SiteInformationSharedService,AllSettingSharedService,
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true},
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}