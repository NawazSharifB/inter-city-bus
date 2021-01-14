import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTicketDetailComponent } from './purchased-ticket-detail.component';

describe('PurchasedTicketDetailComponent', () => {
  let component: PurchasedTicketDetailComponent;
  let fixture: ComponentFixture<PurchasedTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
