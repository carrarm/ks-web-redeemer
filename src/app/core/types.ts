export interface Alliance {
  tag: string;
  name: string;
}

export interface Governor {
  id: number;
  name: string;
}

export type AllianceRoster = Alliance & { roster: Governor[]; lastSync: string };
