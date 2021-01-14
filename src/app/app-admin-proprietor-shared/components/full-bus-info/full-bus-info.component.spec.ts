import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBusInfoComponent } from './full-bus-info.component';

describe('FullBusInfoComponent', () => {
  let component: FullBusInfoComponent;
  let fixture: ComponentFixture<FullBusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
