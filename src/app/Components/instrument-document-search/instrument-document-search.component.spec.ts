import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentDocumentSearchComponent } from './instrument-document-search.component';

describe('InstrumentDocumentSearchComponent', () => {
  let component: InstrumentDocumentSearchComponent;
  let fixture: ComponentFixture<InstrumentDocumentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentDocumentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentDocumentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
