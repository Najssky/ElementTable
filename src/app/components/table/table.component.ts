import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ElementService } from '../../services/element.service';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  elements$: Observable<any>;

  constructor(private elementService: ElementService, private dialog: MatDialog) {
    this.elements$ = this.elementService.elements$;
  }

  ngOnInit(): void {
  }


  async editElement(position: number): Promise<void> {
    const elementToEdit = await firstValueFrom(
      this.elementService.select('elements').pipe(
        map(elements => elements.find(e => e.position === position))
      )
    );
  
    const dialogRef = this.dialog.open(EditElementComponent, {
      data: { ...elementToEdit },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.updateElement(result);
      }
    });
  }
  
}