import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { Governor } from '@/core/types';
import { environment } from '@env/environment';

@Service()
export class AllianceService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.firebaseUrl;

  private rosterCache: Record<string, Governor[]> = {};

  public searchGovernor(governorId: number): Observable<Governor | undefined> {
    return this.http.get<Governor>(`${this.baseUrl}/governorInfo?gid=${governorId}`);
  }

  public getRoster(kingdomId: number, allianceTag: string): Observable<Governor[]> {
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
