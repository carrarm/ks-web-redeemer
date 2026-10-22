export interface Alliance {
  tag: string;
  name: string;
}

export interface Governor {
  id: number;
  name: string;
}

export type AllianceRoster = Alliance & { roster: Governor[]; lastSync: string };

export interface GiftCode {
  code: string;
  expDate: string;
}

export interface CodeRedemption {
  code: string;
  state: 'redeemed' | 'failed' | 'new' | 'ignored';
  errorCode?: string;
  errorMessage?: string;
}
