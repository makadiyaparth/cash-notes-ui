import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NoteDTO } from '../dtos/note-dto';

@Injectable({
  providedIn: 'root',
})
export class NoteDataService {
  public onChange$: Subject<boolean> = new Subject();
  public total$: Subject<number> = new Subject();

  public onEdit: BehaviorSubject<NoteDTO> = new BehaviorSubject(null);
  public onEdit$ = this.onEdit.asObservable();

  constructor() {}

  changed(): void {
    this.onChange$.next(true);
  }

  total(total: number): void {
    this.total$.next(total);
  }

  edit(note: NoteDTO): void {
    this.onEdit.next(note);
  }
}
