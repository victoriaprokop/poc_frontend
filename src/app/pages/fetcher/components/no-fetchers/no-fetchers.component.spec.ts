import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFetchersComponent } from './no-fetchers.component';

describe('NoFetchersComponent', () => {
  let component: NoFetchersComponent;
  let fixture: ComponentFixture<NoFetchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFetchersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoFetchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
