import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrls: ['./sorting-button.component.scss']
})
export class SortingButtonComponent {
  @Output() public onSortUp = new EventEmitter<void>;
  @Output() public onSortDown = new EventEmitter<void>;

  @Input() activeSorting: string = null;
}
