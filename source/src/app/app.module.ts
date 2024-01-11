import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChitchatNameComponent } from './chitchat-name/chitchat-name.component';
import { SignupSectionComponent } from './signup-section/signup-section.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SigninSectionComponent } from './signin-section/signin-section.component';
import { ChatsPageComponent } from './chats-page/chats-page.component';
import { ChatsHeaderComponent } from './chats-header/chats-header.component';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { SendMessageComponent } from './send-message/send-message.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChitchatNameComponent,
    SignupSectionComponent,
    SignupPageComponent,
    SigninPageComponent,
    SigninSectionComponent,
    ChatsPageComponent,
    ChatsHeaderComponent,
    ChatsListComponent,
    ChatDetailComponent,
    SendMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
