import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFetcherDialogComponent } from './delete-fetcher-dialog.component';

describe('DeleteFetcherDialogComponent', () => {
  let component: DeleteFetcherDialogComponent;
  let fixture: ComponentFixture<DeleteFetcherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFetcherDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFetcherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
