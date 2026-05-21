import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerSectionComponent } from './timer-section.component';

describe('TimerSectionComponent', () => {
  let component: TimerSectionComponent;
  let fixture: ComponentFixture<TimerSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerSectionComponent]
    });
    fixture = TestBed.createComponent(TimerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
