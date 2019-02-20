import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubstitutionaryComponent } from './components/substitutionary/substitutionary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { InstallmentsComponent } from './components/installments/installments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubstitutionaryComponent,
    MainComponent,
    InstallmentsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
