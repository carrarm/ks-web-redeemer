import { Component, inject } from '@angular/core';
import { Icon } from '@/components/common/icon/icon';
import { AppState } from '@/core/app-state';

@Component({
  imports: [Icon],
  selector: 'ks-alliance-redemption',
  styleUrl: './alliance-redemption.css',
  templateUrl: './alliance-redemption.html',
})
export class AllianceRedemption {
  private readonly appState = inject(AppState);

  protected goBack(): void {
    this.appState.alliance.set(undefined);
  }
}
