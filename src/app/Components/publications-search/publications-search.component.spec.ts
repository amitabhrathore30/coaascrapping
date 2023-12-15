import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsSearchComponent } from './publications-search.component';

describe('PublicationsSearchComponent', () => {
  let component: PublicationsSearchComponent;
  let fixture: ComponentFixture<PublicationsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
