import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-edit-element',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css'],
})
export class EditElementComponent{
  originalData: DialogData;
  editForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditElementComponent>,
    private fb: FormBuilder
  ) {
    this.originalData = { ...data };
    this.editForm = this.fb.group({
      name: [data.name, [Validators.required, this.invalidCharsValidator]],
      weight: [data.weight, [Validators.required]],
      symbol: [data.symbol, [Validators.required, this.invalidCharsValidator]]
    });
  }

  invalidCharsValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    
    if (isWhitespace || hasSpecialChars) {
      return { 'invalidInput': true };
    }
    
    return null;
  }
  onSave(): void {
    if (this.editForm.valid) {
      const updatedData = {
        position: this.originalData['position'],
        name: this.editForm.value.name,
        weight: this.editForm.value.weight,
        symbol: this.editForm.value.symbol
      };
      if (
        updatedData.name === this.originalData.name &&
        updatedData.weight === this.originalData.weight &&
        updatedData.symbol === this.originalData.symbol
      ) {
        this.dialogRef.close();
        console.log(this.originalData)
        return;
      }
      this.dialogRef.close(updatedData);
  
      console.log(updatedData)
    } else {
      alert('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}