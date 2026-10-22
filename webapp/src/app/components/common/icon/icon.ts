import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'ks-icon',
  styleUrl: './icon.css',
  templateUrl: './icon.html',
})
export class Icon {
  public readonly name = input.required<string>();
  public readonly size = input<'sm' | 'md' | 'lg' | 'xl' | string>('md');

  protected readonly svgPath = computed(() => `icons/${this.name()}.svg`);
  protected readonly iconSize = computed(() => {
    const sizes: Record<string, string> = {
      sm: '1.2rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
    };
    return sizes[this.size()] || this.size();
  });
}
