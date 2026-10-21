import { Component, signal } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { DatePipe } from '@angular/common';

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
  protected readonly giftCodes = signal<GiftCode[]>(this.mockCodes());

  private mockCodes(): GiftCode[] {
    return [
      { code: 'VIP777', expDate: '2024-01-01' },
      { code: 'Kingshot888', expDate: '2024-02-01' },
      { code: 'Slayer999', expDate: '2024-03-01' },
      { code: 'Archer1010', expDate: '2024-04-01' },
    ];
  }
}
