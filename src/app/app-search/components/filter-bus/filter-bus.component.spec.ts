import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBusComponent } from './filter-bus.component';

describe('FilterBusComponent', () => {
  let component: FilterBusComponent;
  let fixture: ComponentFixture<FilterBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
