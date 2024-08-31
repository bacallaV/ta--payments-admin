import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';
// Angular Material
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
// Interfaces
import { ISortFilters } from '../../utils/interfaces/sort-filters.interface';
import { IPayment } from '../../utils/interfaces/payment.interface';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.scss'
})
export class PaymentsTableComponent implements OnInit, OnChanges {
  @Input({ required: true })
  public payments!: IPayment[];

  @Output()
  public onSortChanged: EventEmitter<ISortFilters | undefined> = new EventEmitter();
  @Output()
  public onEdit: EventEmitter<IPayment> = new EventEmitter();
  @Output()
  public onDelete: EventEmitter<IPayment> = new EventEmitter();

  protected displayedColumns: string[] = ['id', 'customerId', 'amount', 'concept', 'date'];
  protected dataSource: MatTableDataSource<IPayment, MatPaginator>;

  constructor() {
    this.dataSource = new MatTableDataSource<IPayment>([]);
  }

  ngOnInit(): void {
    this.dataSource.data = this.payments;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['payments'] && !changes['payments'].firstChange) {
      this.dataSource.data = changes['payments'].currentValue;
    }
  }

  public changeSort(sortState: Sort) {
    if (sortState.direction === '') {
      this.onSortChanged.emit();
      return;
    }

    this.onSortChanged.emit({
      sortBy: sortState.active as ISortFilters['sortBy'],
      sortOrder: sortState.direction as ISortFilters['sortOrder'],
    });
  }

  public emitEditPayment(payment: IPayment): void {
    this.onEdit.emit(payment);
  }

  public emitDeletePayment(payment: IPayment): void {
    this.onDelete.emit(payment);
  }
}
