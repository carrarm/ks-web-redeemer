import { Component, computed, inject, input, model } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { AllianceService } from '@/core/services/alliance-service';
import { Alliance, Governor } from '@/core/types';
import { AppState } from '@/core/app-state';

interface RedemptionCardData {
  type: 'governor' | 'alliance';
  logo: string;
  title: string;
  description: string;
}

@Component({
  imports: [Icon],
  selector: 'ks-redemption-card',
  styleUrl: './redemption-card.css',
  templateUrl: './redemption-card.html',
})
export class RedemptionCard {
  public readonly alliance = input<Alliance>();
  public readonly governor = input<Governor>();
  public readonly pinned = model(false);

  private readonly allianceService = inject(AllianceService);
  private readonly appState = inject(AppState);

  protected readonly isGovernor = computed(() => !!this.governor());
  protected readonly card = computed(() => {
    const governor = this.governor();
    const alliance = this.alliance();

    if (governor) {
      return {
        type: 'governor',
        logo: 'governor-logo',
        title: governor.name,
        description: `Governor ID: ${governor.id}`,
      } satisfies RedemptionCardData;
    }

    if (alliance) {
      return {
        type: 'alliance',
        logo: 'alliance-logo',
        title: `[${alliance.tag}] ${alliance.name}`,
        description: `XX members`,
      } satisfies RedemptionCardData;
    }

    return {};
  });

  protected redeemForGovernor(): void {
    // TODO
  }

  protected togglePinState(): void {
    this.pinned.update((state) => !state);
  }

  protected viewAlliance(): void {
    const alliance = this.alliance();
    if (!alliance) return;

    this.allianceService.getRoster(alliance.tag).subscribe((roster) => {
      this.appState.alliance.set({ ...alliance, roster, lastSync: new Date().toISOString() });
    });
  }
}
