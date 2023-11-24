import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChitchatNameComponent } from './chitchat-name/chitchat-name.component';
import { SignupSectionComponent } from './signup-section/signup-section.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChitchatNameComponent,
    SignupSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
