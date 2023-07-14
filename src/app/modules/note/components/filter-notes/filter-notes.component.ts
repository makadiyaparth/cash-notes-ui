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
  date;
  today = getDate();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.date = this.route.snapshot.queryParams.date || this.today;
  }

  onFilter(): void {
    this.router.navigate(['/notes'], {
      queryParams: { date: this.date },
    });
  }

  exportToday(): void {
    this.noteService.export(this.today).subscribe((pdf) => {
      saveAs(pdf, this.getFileName());
    });
  }

  exportRange(): void {
    this.noteService.export(this.date).subscribe((pdf) => {
      saveAs(pdf, this.getFileName());
    });
  }

  private getFileName(): string {
    return `cash_notes_${this.date}.pdf`;
  }
}
