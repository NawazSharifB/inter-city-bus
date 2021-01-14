import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllBusListComponent } from './admin-all-bus-list.component';

describe('AdminAllBusListComponent', () => {
  let component: AdminAllBusListComponent;
  let fixture: ComponentFixture<AdminAllBusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllBusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllBusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
