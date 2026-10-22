import { inject, Service, signal } from '@angular/core';
import { AllianceRoster, GiftCode } from '@/core/types';
import { GiftCodeService } from '@/core/services/gift-code-service';

@Service()
export class AppState {
  private readonly giftCodeService = inject(GiftCodeService);

  public readonly alliance = signal<AllianceRoster | undefined>(undefined);
  public readonly giftCodes = signal<GiftCode[]>([]);

  constructor() {
    this.giftCodeService.fetchGiftCodes().subscribe((codes) => this.giftCodes.set(codes));
  }
}
