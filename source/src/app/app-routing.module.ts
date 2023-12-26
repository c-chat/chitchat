import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ChatsPageComponent } from './chats-page/chats-page.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupPageComponent,},
  { path: 'signin', component: SigninPageComponent,},
  { path: 'chats', component: ChatsPageComponent},
  { path: 'chats/:id', component: ChatDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
