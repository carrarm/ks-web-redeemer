import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Service()
export class GiftCodeService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.firebaseUrl;

  public fetchGiftCodes(): Observable<string[]> {
    return this.http
      .get<{ codes: string[] }>(`${this.baseUrl}/giftCodes`)
      .pipe(map((response) => response.codes));
  }
}
