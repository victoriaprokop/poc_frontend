import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-week-days-selector',
  templateUrl: './week-days-selector.component.html',
  styleUrls: ['./week-days-selector.component.scss']
})
export class WeekDaysSelectorComponent implements OnInit {
  @Input() public selectedDays: number[] = [];
  @Output() private onDaySelection = new EventEmitter<number[]>;

  public daysList: { day: string, dayIndex: number, selected: boolean }[] = [
    { day: 'Sun', dayIndex: 0, selected: false },
    { day: 'Mon', dayIndex: 1, selected: false },
    { day: 'Tue', dayIndex: 2, selected: false },
    { day: 'Wed', dayIndex: 3, selected: false },
    { day: 'Thu', dayIndex: 4, selected: false },
    { day: 'Fri', dayIndex: 5, selected: false },
    { day: 'Sat', dayIndex: 6, selected: false },
  ]

  ngOnInit(): void {
    if (this.selectedDays.length) {
      this.selectedDays.forEach((dayIndex) => {
        this.daysList[dayIndex].selected = true;
      });
    }
  }

  onDaySelectionChange(day: { day: string, selected: boolean }) {
    day.selected = !day.selected;

    const selectedDays = this.daysList.filter(day => day.selected === true).map(day => day.dayIndex);

    this.onDaySelection.emit(selectedDays);
  }
}
