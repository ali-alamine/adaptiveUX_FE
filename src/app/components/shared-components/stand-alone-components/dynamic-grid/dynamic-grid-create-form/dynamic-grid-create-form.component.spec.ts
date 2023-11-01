import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGridCreateFormComponent } from './dynamic-grid-create-form.component';

describe('DynamicGridCreateFormComponent', () => {
  let component: DynamicGridCreateFormComponent;
  let fixture: ComponentFixture<DynamicGridCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicGridCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicGridCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
