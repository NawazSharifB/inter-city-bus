import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorAllBusListComponent } from './proprietor-all-bus-list.component';

describe('ProprietorAllBusListComponent', () => {
  let component: ProprietorAllBusListComponent;
  let fixture: ComponentFixture<ProprietorAllBusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProprietorAllBusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietorAllBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
