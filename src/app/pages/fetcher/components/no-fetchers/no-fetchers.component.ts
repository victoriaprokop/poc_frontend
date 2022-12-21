import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-no-fetchers',
  templateUrl: './no-fetchers.component.html',
  styleUrls: ['./no-fetchers.component.scss']
})
export class NoFetchersComponent {
  @Output() public addFetcher = new EventEmitter<void>();
}
