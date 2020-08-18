import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationInstallComponent } from './application-install.component';

describe('ApplicationInstallComponent', () => {
  let component: ApplicationInstallComponent;
  let fixture: ComponentFixture<ApplicationInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationInstallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
