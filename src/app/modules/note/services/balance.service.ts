import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDate } from 'src/app/common/util';
import { ApiService } from 'src/app/services/api.service';
import { BalanceDTO } from '../dtos/balance-dto';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private readonly serviceBasePath = '/balance';

  constructor(private api: ApiService) {}

  getBalance(date: string = getDate()): Observable<BalanceDTO> {
    return this.api.get(this.serviceBasePath, { date });
  }
}
