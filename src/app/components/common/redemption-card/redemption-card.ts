import { Component, computed, input, output } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';

export interface RedemptionCardData {
  type: 'governor' | 'alliance';
  title: string;
  description: string;
  pinned?: boolean;
}

@Component({
  imports: [Icon],
  selector: 'ks-redemption-card',
  styleUrl: './redemption-card.css',
  templateUrl: './redemption-card.html',
})
export class RedemptionCard {
  public readonly card = input.required<RedemptionCardData>();
  public readonly actionClicked = output<void>();
  public readonly pinClicked = output<void>();

  protected readonly isGovernor = computed(() => this.card().type === 'governor');
}
