import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietorPanelComponent } from './proprietor-panel.component';

describe('ProprietorPanelComponent', () => {
  let component: ProprietorPanelComponent;
  let fixture: ComponentFixture<ProprietorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProprietorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
