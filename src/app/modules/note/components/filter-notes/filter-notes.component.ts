import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { getDate } from 'src/app/common/util';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-filter-notes',
  templateUrl: './filter-notes.component.html',
})
export class FilterNotesComponent implements OnInit {
  fromDate;
  toDate;
  today = getDate();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.fromDate = this.route.snapshot.queryParams.fromDate || this.today;
    this.toDate = this.route.snapshot.queryParams.toDate || this.today;
  }

  onFilter(): void {
    this.router.navigate(['/notes'], {
      queryParams: { fromDate: this.fromDate, toDate: this.toDate },
    });
  }

  exportToday(): void {
    this.noteService.export(this.today).subscribe((pdf) => {
      saveAs(pdf, this.getFileName());
    });
  }

  exportRange(): void {
    this.noteService.export(this.fromDate, this.toDate).subscribe((pdf) => {
      saveAs(pdf, this.getFileName());
    });
  }

  private getFileName(): string {
    return `cash_notes_${this.fromDate}_${this.toDate}.pdf`;
  }
}
