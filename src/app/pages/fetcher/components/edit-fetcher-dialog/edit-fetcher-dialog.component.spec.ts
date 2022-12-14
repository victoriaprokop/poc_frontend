import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFetcherDialogComponent } from './edit-fetcher-dialog.component';

describe('EditFetcherDialogComponent', () => {
  let component: EditFetcherDialogComponent;
  let fixture: ComponentFixture<EditFetcherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFetcherDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFetcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
