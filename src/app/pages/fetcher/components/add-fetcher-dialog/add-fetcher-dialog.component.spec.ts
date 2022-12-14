import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFetcherDialogComponent } from './add-fetcher-dialog.component';

describe('AddFetcherDialogComponent', () => {
  let component: AddFetcherDialogComponent;
  let fixture: ComponentFixture<AddFetcherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFetcherDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFetcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
