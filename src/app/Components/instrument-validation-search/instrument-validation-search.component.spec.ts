import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentValidationSearchComponent } from './instrument-validation-search.component';

describe('InstrumentValidationSearchComponent', () => {
  let component: InstrumentValidationSearchComponent;
  let fixture: ComponentFixture<InstrumentValidationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentValidationSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentValidationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
