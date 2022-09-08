import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanvcardComponent } from './scanvcard.component';

describe('ScanvcardComponent', () => {
  let component: ScanvcardComponent;
  let fixture: ComponentFixture<ScanvcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanvcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanvcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
