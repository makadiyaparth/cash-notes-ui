import { TransactionType } from '../enums/transaction-type.enum';

export interface NoteDTO {
  _id: number;
  note: string;
  date: string;
  amount: number;
  type: TransactionType;
}
