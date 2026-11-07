import { Component, inject } from '@angular/core';

import { Icon } from '@/components/common/icon/icon';
import { AppState } from '@/core/app-state';

@Component({
  imports: [Icon],
  selector: 'ks-gift-codes',
  styleUrl: './gift-codes.css',
  templateUrl: './gift-codes.html',
})
export class GiftCodes {
  private readonly appState = inject(AppState);

  protected readonly giftCodes = this.appState.giftCodes;
}
