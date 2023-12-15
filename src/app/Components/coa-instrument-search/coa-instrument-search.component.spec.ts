import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaInstrumentSearchComponent } from './coa-instrument-search.component';

describe('CoaInstrumentSearchComponent', () => {
  let component: CoaInstrumentSearchComponent;
  let fixture: ComponentFixture<CoaInstrumentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaInstrumentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaInstrumentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
