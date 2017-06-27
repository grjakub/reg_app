import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegPannelComponent } from './components/reg-pannel/reg-pannel.component'

const setRoutes: Routes = [
  { path: 'reg-pannel', component: RegPannelComponent},
  { path: '**', component: RegPannelComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(setRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class RoutingModule { }