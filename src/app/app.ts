import { Component, inject } from '@angular/core';

import { GiftCodes } from '@/components/gift-codes/gift-codes';
import { PinnedRedemptionCards } from '@/components/pinned-redemption-cards/pinned-redemption-cards';
import { Header } from '@/components/header/header';
import { RosterSearchField } from '@/components/roster-search-field/roster-search-field';
import { AppState } from '@/core/app-state';
import { AllianceRedemption } from '@/components/alliance-redemption/alliance-redemption';

@Component({
  imports: [GiftCodes, PinnedRedemptionCards, Header, RosterSearchField, AllianceRedemption],
  selector: 'ks-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly appState = inject(AppState);

  protected readonly alliance = this.appState.alliance;
}
