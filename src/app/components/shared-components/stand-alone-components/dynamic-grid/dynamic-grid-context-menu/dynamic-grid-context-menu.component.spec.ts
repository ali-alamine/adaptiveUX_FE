import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGridContextMenuComponent } from './dynamic-grid-context-menu.component';

describe('DynamicGridContextMenuComponent', () => {
  let component: DynamicGridContextMenuComponent;
  let fixture: ComponentFixture<DynamicGridContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicGridContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicGridContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
