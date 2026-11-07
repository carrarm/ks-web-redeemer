import { Component, input, model } from '@angular/core';

export interface ToggleButton<T> {
  label: string;
  value: T;
}

@Component({
  imports: [],
  selector: 'ks-toggle-buttons',
  styleUrl: './toggle-buttons.css',
  templateUrl: './toggle-buttons.html',
})
export class ToggleButtons<T> {
  public readonly buttons = input.required<ToggleButton<T>[]>();
  public readonly active = model.required<T>();
}
