import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAutoValidateComponent } from './ngx-auto-validate.component';

describe('NgxAutoValidateComponent', () => {
  let component: NgxAutoValidateComponent;
  let fixture: ComponentFixture<NgxAutoValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAutoValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAutoValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
