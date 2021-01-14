import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBusBrandComponent } from './add-new-bus-brand.component';

describe('AddNewBusBrandComponent', () => {
  let component: AddNewBusBrandComponent;
  let fixture: ComponentFixture<AddNewBusBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBusBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBusBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
