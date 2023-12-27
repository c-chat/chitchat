import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { SignupPageComponent } from './signup-page.component';
import { ChitchatNameComponent } from '../chitchat-name/chitchat-name.component';
import { SignupSectionComponent } from '../signup-section/signup-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPageComponent, HeaderComponent, ChitchatNameComponent, SignupSectionComponent],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
