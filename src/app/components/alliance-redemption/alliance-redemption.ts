import { Component, computed, inject } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { AppState } from '@/core/app-state';
import { AllianceMember } from '@/components/alliance-redemption/alliance-member/alliance-member';

@Component({
  imports: [Icon, AllianceMember],
  selector: 'ks-alliance-redemption',
  styleUrl: './alliance-redemption.css',
  templateUrl: './alliance-redemption.html',
})
export class AllianceRedemption {
  private readonly appState = inject(AppState);

  protected readonly giftCodes = this.appState.giftCodes;
  protected readonly roster = computed(() => this.appState.alliance()?.roster || []);

  protected goBack(): void {
    this.appState.alliance.set(undefined);
  }
}
