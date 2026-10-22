import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GiftCode } from '@/core/types';

@Service()
export class GiftCodeService {
  public fetchGiftCodes(): Observable<GiftCode[]> {
    return of([
      { code: 'VIP777', expDate: '2024-01-01' },
      { code: 'Kingshot888', expDate: '2024-02-01' },
      { code: 'Slayer999', expDate: '2024-03-01' },
      { code: 'Archer1010', expDate: '2024-04-01' },
    ]);
  }
}
