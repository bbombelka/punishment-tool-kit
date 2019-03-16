import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubstitutionaryComponent } from './components/substitutionary/substitutionary.component';
import { MainComponent } from './components/main/main.component';
import { InstallmentsComponent } from './components/installments/installments.component';
import { ExpiryComponent } from './components/expiry/expiry.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { SentencerComponent } from './components/sentencer/sentencer.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'installments', component: InstallmentsComponent },
  { path: 'expiry', component: ExpiryComponent },
  {
    path: 'subst',
    component: SubstitutionaryComponent,
  },
  { path: 'deductions', component: DeductionsComponent },
  { path: 'sentencer', component: SentencerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
