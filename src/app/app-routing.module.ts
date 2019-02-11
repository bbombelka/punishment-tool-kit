import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubstitutionaryComponent } from './components/substitutionary/substitutionary.component';

const routes: Routes = [
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
