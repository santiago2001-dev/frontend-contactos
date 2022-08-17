import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEnlaceComponent } from './get-enlace.component';

describe('GetEnlaceComponent', () => {
  let component: GetEnlaceComponent;
  let fixture: ComponentFixture<GetEnlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEnlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEnlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
