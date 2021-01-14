import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewModeratorComponent } from './create-new-moderator.component';

describe('CreateNewModeratorComponent', () => {
  let component: CreateNewModeratorComponent;
  let fixture: ComponentFixture<CreateNewModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
