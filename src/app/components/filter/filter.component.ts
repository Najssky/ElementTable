import { Component } from '@angular/core';
import { ElementService } from '../../services/element.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  private filterSubject = new Subject<string>();

  constructor(private elementService: ElementService) {
    this.filterSubject.pipe(
      debounceTime(2000)
    ).subscribe(value => {
      this.elementService.filterElements(value);
    });
  }

  onFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterSubject.next(inputElement.value);
  }
}