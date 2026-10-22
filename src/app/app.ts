import { Component } from '@angular/core';

import { GiftCodes } from '@/components/gift-codes/gift-codes';
import { PinnedRedemptionCards } from '@/components/pinned-redemption-cards/pinned-redemption-cards';
import { Header } from '@/components/header/header';
import { RosterSearchField } from '@/components/roster-search-field/roster-search-field';

@Component({
  imports: [GiftCodes, PinnedRedemptionCards, Header, RosterSearchField],
  selector: 'ks-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
