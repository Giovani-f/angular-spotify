import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss'],
})
export class NavigationButtonComponent {
  @Input()
  description: string = '';
  @Input()
  isActive: boolean = false;

  @Output()
  customClick = new EventEmitter<void>();

  constructor() {}

  onClick(): void {
    this.customClick.emit();
  }
}
