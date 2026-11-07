import { Component, inject, signal } from '@angular/core';

import { Icon } from '@/components/common/icon/icon';
import { ToggleButton, ToggleButtons } from '@/components/common/toggle-buttons/toggle-buttons';
import { AllianceService } from '@/core/services/alliance-service';
import { FormsModule } from '@angular/forms';

type SearchType = 'governor' | 'alliance';

@Component({
  imports: [Icon, ToggleButtons, FormsModule],
  selector: 'ks-roster-search-field',
  styleUrl: './roster-search-field.css',
  templateUrl: './roster-search-field.html',
})
export class RosterSearchField {
  private readonly allianceService = inject(AllianceService);

  protected readonly searchTypeButtons: ToggleButton<SearchType>[] = [
    { label: 'Governor', value: 'governor' },
    { label: 'Alliance', value: 'alliance' },
  ];

  protected readonly governorId = signal<number | undefined>(undefined);
  protected readonly searchType = signal<SearchType>('governor');

  protected searchGovernor(): void {
    if (!this.governorId()) {
      console.warn('No governor ID provided');
      return;
    }

    this.allianceService.searchGovernor(this.governorId()!).subscribe((governor) => {
      console.log(governor);
    });
  }
}
