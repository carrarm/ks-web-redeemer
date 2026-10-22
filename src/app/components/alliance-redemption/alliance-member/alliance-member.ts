import { Component, input, OnInit, signal } from '@angular/core';
import { CodeRedemption, GiftCode, Governor } from '@/core/types';
import { Icon } from '@/components/common/icon/icon';
import { I18nPluralPipe } from '@angular/common';

@Component({
  imports: [Icon, I18nPluralPipe],
  selector: 'ks-alliance-member',
  styleUrl: './alliance-member.css',
  templateUrl: './alliance-member.html',
})
export class AllianceMember implements OnInit {
  public readonly availableGiftCodes = input.required<GiftCode[]>();
  public readonly governor = input.required<Governor>();

  protected readonly detailVisible = signal(false);
  protected readonly redemptions = signal<CodeRedemption[]>([]);

  protected readonly codesToRedeemPlural = {
    '=0': 'No codes',
    '=1': '1 code',
    other: '# codes',
  };

  protected readonly codeStateText = {
    redeemed: 'Redeemed',
    failed: 'Failed',
    new: 'New',
    ignored: 'Ignored',
  };

  public ngOnInit(): void {
    this.redemptions.set(
      this.availableGiftCodes().map((code) => ({ code: code.code, state: 'new' })),
    );
  }

  protected toggleDetail(): void {
    this.detailVisible.update((state) => !state);
  }
}
