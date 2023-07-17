import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { getDate } from 'src/app/common/util';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-filter-notes',
  templateUrl: './filter-notes.component.html',
})
export class FilterNotesComponent {
  date: string;
  today: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {
    this.today = getDate();
    this.date = this.route.snapshot.queryParams.date || this.today;
  }

  onFilter(): void {
    this.router.navigate(['/notes'], {
      queryParams: { date: this.date },
    });
  }

  exportRecords(): void {
    this.noteService.export(this.date).subscribe((pdf) => {
      saveAs(pdf, this.getFileName());
    });
  }

  private getFileName(): string {
    return `cash_notes_${this.date}.pdf`;
  }
}
