import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGridPaginatorComponent } from './dynamic-grid-paginator.component';

describe('DynamicGridPaginatorComponent', () => {
  let component: DynamicGridPaginatorComponent;
  let fixture: ComponentFixture<DynamicGridPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicGridPaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicGridPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
