import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note/note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { ListNotesComponent } from './components/list-notes/list-notes.component';
import { SharedModule } from '../shared/shared.module';
import { FilterNotesComponent } from './components/filter-notes/filter-notes.component';
import { ViewBalanceComponent } from './components/view-balance/view-balance.component';

@NgModule({
  declarations: [
    NoteComponent,
    CreateNoteComponent,
    ListNotesComponent,
    FilterNotesComponent,
    ViewBalanceComponent,
  ],
  imports: [CommonModule, NoteRoutingModule, SharedModule],
})
export class NoteModule {}
