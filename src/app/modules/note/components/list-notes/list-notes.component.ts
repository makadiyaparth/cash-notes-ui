import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDate } from 'src/app/common/util';
import { NoteDTO } from '../../dtos/note-dto';
import { NoteDataService } from '../../services/note-data.service';
import { NoteService } from '../../services/note.service';
import { TransactionType } from '../../enums/transaction-type.enum';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
})
export class ListNotesComponent implements OnInit {
  notes: NoteDTO[];
  creditNotes: NoteDTO[];
  debitNotes: NoteDTO[];

  date: string;
  editMode: boolean;

  constructor(
    private noteService: NoteService,
    private noteData: NoteDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeQueryParams();
    this.noteData.onChange$.subscribe((_) => this.findAll());
  }

  onEdit(note: NoteDTO): void {
    this.noteData.edit(note);
    this.editMode = true;
  }

  onDelete(id: number): void {
    this.noteService.delete(id).subscribe((_) => this.findAll());
  }

  private subscribeQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.date = params['date'] || getDate();
      this.findAll();
    });
  }

  private findAll(): void {
    this.editMode = false;
    this.noteService
      .findAllByDate(this.date)
      .subscribe((notes: NoteDTO[]) => {
        this.notes = notes;
        this.creditNotes = this.getNotesByType(TransactionType.CREDIT);
        this.debitNotes = this.getNotesByType(TransactionType.DEBIT);
        this.noteData.total(this.noteService.getTotal(notes));
      });
  }

  private getNotesByType(type: TransactionType): NoteDTO[] {
    return this.notes.filter((note) => note.type === type);
  }
}
