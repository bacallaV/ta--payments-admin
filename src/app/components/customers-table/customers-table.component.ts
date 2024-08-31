import { DatePipe } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
// Angular material
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Own imports
import { ICustomer } from '../../utils/interfaces/customers.interface';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss'
})
export class CustomersTableComponent implements OnInit, OnChanges {
  @Input({ required: true })
  public customers!: ICustomer[];

  @Output()
  public onEdit: EventEmitter<ICustomer> = new EventEmitter();
  @Output()
  public onDelete: EventEmitter<ICustomer> = new EventEmitter();

  protected displayedColumns: string[] = ['id', 'name', 'lastname', 'dateOfBirth', 'actions'];
  protected dataSource: MatTableDataSource<ICustomer, MatPaginator>;

  constructor() {
    this.dataSource = new MatTableDataSource<ICustomer>([]);
  }

  ngOnInit(): void {
    this.dataSource.data = this.customers;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customers'] && !changes['customers'].firstChange) {
      this.dataSource.data = changes['customers'].currentValue;
    }
  }

  public emitEditCustomer(payment: any): void {
    this.onEdit.emit(payment);
  }

  public emitDeleteCustomer(payment: any): void {
    this.onDelete.emit(payment);
  }
}
