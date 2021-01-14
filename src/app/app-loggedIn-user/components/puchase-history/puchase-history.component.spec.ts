import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuchaseHistoryComponent } from './puchase-history.component';

describe('PuchaseHistoryComponent', () => {
  let component: PuchaseHistoryComponent;
  let fixture: ComponentFixture<PuchaseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuchaseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
