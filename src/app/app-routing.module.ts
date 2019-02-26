import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubstitutionaryComponent } from './components/substitutionary/substitutionary.component';
import { MainComponent } from './components/main/main.component';
import { InstallmentsComponent } from './components/installments/installments.component';
import { ExpiryComponent } from './components/expiry/expiry.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'installments', component: InstallmentsComponent },
  { path: 'expiry', component: ExpiryComponent },
  {
    path: 'subst',
    component: SubstitutionaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
