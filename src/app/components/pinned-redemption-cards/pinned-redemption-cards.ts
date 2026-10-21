import { Component, signal } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import {
  RedemptionCard,
  RedemptionCardData,
} from '@/components/common/redemption-card/redemption-card';

@Component({
  imports: [Icon, RedemptionCard],
  selector: 'ks-pinned-redemption-cards',
  styleUrl: './pinned-redemption-cards.css',
  templateUrl: './pinned-redemption-cards.html',
})
export class PinnedRedemptionCards {
  protected readonly cards = signal<RedemptionCardData[]>(this.mockCards());

  private mockCards(): RedemptionCardData[] {
    return [
      {
        type: 'governor',
        title: 'Lord Chuck IV',
        description: 'Governor ID: 123456789',
        pinned: true,
      },
      {
        type: 'alliance',
        title: '[emr] Lordaeron',
        description: '97 members',
        pinned: true,
      },
    ];
  }
}
