import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent {
  originalData: DialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditElementComponent>
  ) {
    this.originalData = { ...data };
  }

  onSave(): void {
    if (
      this.data.name === this.originalData.name &&
      this.data.weight === this.originalData.weight &&
      this.data.symbol === this.originalData.symbol
    ) {
      this.dialogRef.close();
      return;
    }
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}