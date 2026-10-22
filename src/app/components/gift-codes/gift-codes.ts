import { Component, inject } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { DatePipe } from '@angular/common';
import { AppState } from '@/core/app-state';

interface GiftCode {
  code: string;
  expDate: string;
}

@Component({
  imports: [Icon, DatePipe],
  selector: 'ks-gift-codes',
  styleUrl: './gift-codes.css',
  templateUrl: './gift-codes.html',
})
export class GiftCodes {
  private readonly appState = inject(AppState);

  protected readonly giftCodes = this.appState.giftCodes;
}
