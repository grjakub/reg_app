import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegPannelComponent } from './components/reg-pannel/reg-pannel.component'

const setRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'reg-pannel', component: RegPannelComponent},
  { path: '**', component: HomePageComponent}
  //{ path: 'dashboard',  component: DashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(setRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class RoutingModule { }