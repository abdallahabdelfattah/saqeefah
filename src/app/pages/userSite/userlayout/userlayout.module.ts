import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserlayoutComponent } from './userlayout.component';
import { HomeComponent } from '../../home/home.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { TopHeaderComponent } from 'src/app/layout/header/top-header/top-header.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { AboutSectionComponent } from '../../home/about-section/about-section.component';
import { RecentListComponent } from '../../home/recent-list/recent-list.component';
import { ParallaxComponent } from '../../home/parallax/parallax.component';
import { SearchComponent } from '../../search/search.component';
import { ProjectDetailsComponent } from '../../project-details/project-details.component';
import { PropertyDetailsComponent } from '../../property-details/property-details.component';
import { FavoritesComponent } from '../../favorites/favorites.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { PlaceorderComponent } from '../../placeorder/placeorder.component';
import { ContactComponent } from '../../contact/contact.component';
import { CompareComponent } from '../../compare/compare.component';
import { OverviewComponent } from '../../project-details/overview/overview.component';
import { BuildingComponent } from '../../building/building.component';
import { BuildingsComponent } from '../../project-details/buildings/buildings.component';
import { SpecsComponent } from '../../project-details/specs/specs.component';
import { ProjectsComponent } from '../../projects/projects.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';




@NgModule({
  declarations: [
    UserlayoutComponent,
    HomeComponent,
    // HeaderComponent,
    // FooterComponent,
    // TopHeaderComponent,
    AboutSectionComponent,
    RecentListComponent,
    ParallaxComponent,
    SearchComponent,
    ProjectDetailsComponent,
    PropertyDetailsComponent,
    FavoritesComponent,
    AboutUsComponent,
    PlaceorderComponent,
    ContactComponent,
    CompareComponent,
    OverviewComponent,
    BuildingsComponent,
    SpecsComponent,
    ProjectsComponent,
    BuildingComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
 
    CountUpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      }
    }),
  ]
})
export class UserlayoutModule { }
