import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProductionDialogComponent } from './schedule-production-dialog.component';

describe('ScheduleProductionDialogComponent', () => {
  let component: ScheduleProductionDialogComponent;
  let fixture: ComponentFixture<ScheduleProductionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleProductionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleProductionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
