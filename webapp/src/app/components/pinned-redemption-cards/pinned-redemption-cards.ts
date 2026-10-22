import { Component, signal } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { RedemptionCard } from '@/components/common/redemption-card/redemption-card';
import { Alliance, Governor } from '@/core/types';

@Component({
  imports: [Icon, RedemptionCard],
  selector: 'ks-pinned-redemption-cards',
  styleUrl: './pinned-redemption-cards.css',
  templateUrl: './pinned-redemption-cards.html',
})
export class PinnedRedemptionCards {
  protected readonly governors = signal<Governor[]>([{ id: 123456789, name: 'Lord Chuck IV' }]);
  protected readonly alliances = signal<Alliance[]>([{ tag: 'emr', name: 'Lordaeron' }]);
}
