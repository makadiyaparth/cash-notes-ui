import { TransactionType } from '../enums/transaction-type.enum';

export interface NoteInDTO {
  amount: number;
  note: string;
  date: string;
  type: TransactionType;
}
