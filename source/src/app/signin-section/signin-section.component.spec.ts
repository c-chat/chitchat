import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninSectionComponent } from './signin-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SigninSectionComponent', () => {
  let component: SigninSectionComponent;
  let fixture: ComponentFixture<SigninSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninSectionComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(SigninSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.signinForm.get('username')?.value).toEqual('');
    expect(component.signinForm.get('password')?.value).toEqual('');
  })
});
