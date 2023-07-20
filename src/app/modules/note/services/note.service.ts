import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDate } from 'src/app/common/util';
import { NoteDTO } from 'src/app/modules/note/dtos/note-dto';
import { ApiService } from '../../../services/api.service';
import { TransactionType } from '../enums/transaction-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly serviceBasePath = '/records';

  constructor(private api: ApiService) {}

  findAll(fromDate: string = getDate(), toDate: string): Observable<NoteDTO[]> {
    return this.api.get(this.serviceBasePath, { fromDate, toDate });
  }

  findOne(id: number): Observable<NoteDTO> {
    return this.api.get(`${this.serviceBasePath}/${id}`);
  }

  save(path: string, data: any): Observable<NoteDTO> {
    return this.api.post(this.serviceBasePath + path, data);
  }

  update(path: string, data: any): Observable<NoteDTO> {
    return this.api.put(this.serviceBasePath + path, data);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.serviceBasePath}/${id}`);
  }

  export(fromDate: string, toDate: string = getDate()): Observable<Blob> {
    return this.api.get(`${this.serviceBasePath}/export`, { fromDate, toDate });
  }

  getTotal(notes: NoteDTO[]): number {
    const creditAmt = notes
      .filter((note) => note.type === TransactionType.CREDIT)
      .map((note) => note.amount)
      .reduce((a, b) => a + b, 0);

    const debitAmt = notes
      .filter((note) => note.type === TransactionType.DEBIT)
      .map((note) => note.amount)
      .reduce((a, b) => a + b, 0);

    return creditAmt - debitAmt;
  }

  findAllByDate(date: string = getDate()): Observable<NoteDTO[]> {
    return this.api.get(this.serviceBasePath, { date });
  }

  getDebitAmount(notes: NoteDTO[]): number {
    return notes
      .filter((note) => note.type === TransactionType.DEBIT)
      .map((note) => note.amount)
      .reduce((a, b) => a + b, 0);
  }

  getCreditAmount(notes: NoteDTO[]): number {
    return notes
      .filter((note) => note.type === TransactionType.CREDIT)
      .map((note) => note.amount)
      .reduce((a, b) => a + b, 0);
  }
}
