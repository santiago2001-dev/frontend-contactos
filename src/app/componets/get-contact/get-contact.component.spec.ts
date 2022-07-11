import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactComponent } from './get-contact.component';

describe('GetContactComponent', () => {
  let component: GetContactComponent;
  let fixture: ComponentFixture<GetContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
