import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { ChitchatNameComponent } from '../chitchat-name/chitchat-name.component';
import { SigninSectionComponent } from '../signin-section/signin-section.component';
import { SigninPageComponent } from './signin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SigninPageComponent', () => {
  let component: SigninPageComponent;
  let fixture: ComponentFixture<SigninPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninPageComponent, HeaderComponent, ChitchatNameComponent, SigninSectionComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(SigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
