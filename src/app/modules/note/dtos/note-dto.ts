import { TransactionType } from '../enums/transaction-type.enum';

export interface NoteDTO {
  id: number;
  note: string;
  createdDate: string;
  amount: number;
  txnType: TransactionType;
}
