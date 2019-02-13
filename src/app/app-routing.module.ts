import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubstitutionaryComponent } from './components/substitutionary/substitutionary.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
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
