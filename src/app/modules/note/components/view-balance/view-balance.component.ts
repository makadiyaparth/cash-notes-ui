import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceService } from '../../services/balance.service';
import { switchMap, tap } from 'rxjs/operators';
import { BalanceDTO } from '../../dtos/balance-dto';
import { NoteDataService } from '../../services/note-data.service';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
})
export class ViewBalanceComponent implements OnInit {
  closingBalance: number;
  balance: BalanceDTO;
  fromDate: string;

  constructor(
    private service: BalanceService,
    private noteData: NoteDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => (this.fromDate = params.fromDate)),
        switchMap((params) => this.service.getBalance(params.fromDate))
      )
      .subscribe((balance) => (this.balance = balance));

    this.noteData.onChange$
      .pipe(switchMap((_) => this.service.getBalance(this.fromDate)))
      .subscribe((balance) => (this.balance = balance));
  }
}
