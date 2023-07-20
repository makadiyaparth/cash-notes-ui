import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getDate } from 'src/app/common/util';
import { NoteService } from 'src/app/modules/note/services/note.service';
import { NoteDTO } from '../../dtos/note-dto';
import { NoteInDTO } from '../../dtos/note-in-dto';
import { TransactionType } from '../../enums/transaction-type.enum';
import { NoteDataService } from '../../services/note-data.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
})
export class CreateNoteComponent implements OnInit {
  form: FormGroup;
  result: number = 0;
  notes: NoteDTO[] = [];

  note: NoteDTO;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private noteData: NoteDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.noteData.onEdit$.subscribe((note: NoteDTO) => {
      this.note = note;
      note && this.patchForm();
    });

    this.fetchNotes();
  }

  save(): void {
    this.noteService.save('', this.compileInDTO()).subscribe((_) => {
      this.initForm();
      this.noteData.changed();
      this.fetchNotes();
    });
  }

  update(): void {
    this.noteService
      .update(`/${this.note._id}`, this.compileInDTO())
      .subscribe((_) => {
        this.initForm();
        this.noteData.changed();
        this.editMode = false;
        this.fetchNotes();
      });
  }

  cancel(): void {
    this.initForm();
    this.editMode = false;
    this.noteData.changed();
    this.fetchNotes();
  }

  onDateChange(): void {
    this.fetchNotes();
  }

  private initForm(): void {
    this.route.queryParams.subscribe((params) => {
      const date = params.date;
      this.form = this.fb.group({
        amount: [null, Validators.required],
        note: ['', Validators.required],
        date: [date || getDate()],
        txnType: [TransactionType.DEBIT],
      });
    });
    this.calculateResult();
  }

  private patchForm(): void {
    this.editMode = true;
    this.form.patchValue({
      amount: this.note.amount,
      note: this.note.note,
      date: this.note.date.split('T')[0],
      txnType: this.note.type,
    });
    this.calculateResult();
  }

  private compileInDTO(): NoteInDTO {
    const form = this.form.controls;
    return {
      amount: form.amount.value,
      note: form.note.value,
      date: form.date.value,
      type: form.txnType.value,
    };
  }

  private fetchNotes(): void {
    const date = this.form.controls.date.value;
    this.noteService.findAllByDate(date).subscribe(
      (notes: NoteDTO[]) => {
        this.notes = notes;
        this.calculateResult();
      },
      (error: any) => {
        console.error(error);
        this.notes = [];
        this.calculateResult();
      }
    );
  }

  private calculateResult(): void {
    const debitAmount = this.noteService.getDebitAmount(this.notes);
    const creditAmount = this.noteService.getCreditAmount(this.notes);
    this.result = creditAmount - debitAmount;
  }  
}
