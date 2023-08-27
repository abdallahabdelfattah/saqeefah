import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaceorderComponent } from './pages/placeorder/placeorder.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { SearchComponent } from './pages/search/search.component';
import { UsagePolicyComponent } from './pages/usage-policy/usage-policy.component';
import { UserlayoutComponent } from './pages/userSite/userlayout/userlayout.component';
import { AuthGuard } from './shared/services/auth.guards';
import { ProjectVillasComponent } from './project-villas/project-villas.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'place-order',
    component: PlaceorderComponent,
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'building/:id',
    component: ProjectDetailsComponent,
  },
  {
    path: 'property',
    component: PropertiesComponent,
  },
  {
    path: 'property/:id',
    component: PropertyDetailsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'compare',
    component: CompareComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'policy',
    component:UsagePolicyComponent

  },
  {
    path: 'project-villas/:id',
    component:ProjectVillasComponent

  },
  {
    path: 'project-villas',
    component:ProjectVillasComponent

  },

  {

    path: 'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' }
];
const routerOptions: ExtraOptions = {
  useHash: true,
   scrollPositionRestoration: 'enabled',
  // anchorScrolling: 'enabled',
  // scrollOffset: [0, 64],
  // ...any other options you'd like to use
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
