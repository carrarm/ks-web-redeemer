import { Service, signal } from '@angular/core';
import { AllianceRoster } from '@/core/types';

@Service()
export class AppState {
  public readonly alliance = signal<AllianceRoster | undefined>(undefined);
}
