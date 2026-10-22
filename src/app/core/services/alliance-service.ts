import { Service } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Governor } from '@/core/types';

@Service()
export class AllianceService {
  private rosterCache: Record<string, Governor[]> = {};

  public getRoster(allianceTag: string): Observable<Governor[]> {
    const cachedRoster = this.rosterCache[allianceTag];
    return cachedRoster
      ? of(cachedRoster)
      : of(this.mockRoster()).pipe(tap((roster) => (this.rosterCache[allianceTag] = roster)));
  }

  private mockRoster(): Governor[] {
    return [
      { id: 1, name: 'Lady Chuck VI' },
      { id: 2, name: 'Lady Chuck IV' },
      { id: 3, name: 'Lady Chuck III' },
      { id: 4, name: 'Lady Chuck II' },
      { id: 5, name: 'Lady Chuck I' },
      { id: 6, name: 'Lord Chuck IV' },
      { id: 7, name: 'Lord Chuck III' },
      { id: 8, name: 'Lord Chuck II' },
      { id: 9, name: 'Lord Chuck I' },
    ];
  }
}
