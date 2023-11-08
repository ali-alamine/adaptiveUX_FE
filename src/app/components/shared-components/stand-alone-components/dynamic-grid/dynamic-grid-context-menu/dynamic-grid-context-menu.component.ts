import { Component, ElementRef, Input, SkipSelf, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHelper } from '../gridHelper.service';
import { PUObject } from 'src/app/models/shared';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'pu-dynamic-grid-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-grid-context-menu.component.html',
  styleUrls: ['./dynamic-grid-context-menu.component.scss']
})
export class DynamicGridContextMenuComponent extends PUObject {
  @ViewChild('contextMenu', { static: true }) contextMenu!: ElementRef

  constructor(@SkipSelf() public gridHelper: GridHelper) {
    super();
    this.options = this.gridHelper.contextMenuActions$.getValue();
    console.log(this.gridHelper.contextMenuActions$.getValue(), "this.gridHelper.contextMenuActions$.getValue()");
  }

  options: Array<any> = []

  //   { action_id: 1, action_key: 'copy', "title": 'Copy', icon: 'fa-solid fa-copy', condition: '' },
  //   { action_id: 3, action_key: 'pin', "title": 'Pin', icon: 'fa-solid fa-thumbtack', condition: { key: 'is_pinned', value: 0 } },
  //   { action_id: 4, action_key: 'unpin', "title": 'Unpin', icon: 'fa-solid fa-link-slash', condition: { key: 'is_pinned', value: 1 } },
  //   { action_id: 5, action_key: 'delete', "title": 'Delete', icon: 'fa-solid fa-trash', condition: '' },
  //   { action_id: 6, action_key: 'edit', "title": 'Edit', icon: 'fa-solid fa-pen-to-square', condition: '' },
  // ];

  ngAfterViewInit() {
    this.getContextMenu();
  }

  getContextMenu() {
    this.gridHelper.contextMenuPos$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (pos: any) => {
        const contextMenuElement = this.contextMenu.nativeElement;
        const x = pos.x + window.scrollX;
        const y = pos.y + window.scrollY;
        contextMenuElement.style.left = x + 'px';
        contextMenuElement.style.top = y + 'px';
      }
    )
  }

  selectContextMenuOption(option: Object) {
    this.gridHelper.selectedContextMenuAction$.next(option);
  }
}
