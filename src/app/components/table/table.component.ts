import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ElementService, Element } from '../../services/element.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: Element) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Element) => `${element.name}`,
    },
    {
      columnDef: 'weight',
      header: 'Weight',
      cell: (element: Element) => `${element.weight}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
      cell: (element: Element) => `${element.symbol}`,
    },
  ];

  dataSource: Element[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private elementService: ElementService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataSource = this.elementService.getElements();
  }
}