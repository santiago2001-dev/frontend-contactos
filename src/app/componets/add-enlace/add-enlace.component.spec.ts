import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnlaceComponent } from './add-enlace.component';

describe('AddEnlaceComponent', () => {
  let component: AddEnlaceComponent;
  let fixture: ComponentFixture<AddEnlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
