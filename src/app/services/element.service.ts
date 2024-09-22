import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map, Observable, combineLatest } from 'rxjs';

export interface singleElement {
  readonly position: number;
  name: string;
  weight: number;
  symbol: string;
}

export interface ElementState {
  elements: singleElement[];
  filter: string;
}

@Injectable({
  providedIn: 'root'
})
export class ElementService extends RxState<ElementState> {

  constructor() {
    super();
    this.set({
      elements: [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
      ],
      filter: '' 
    });
  }

  elements$ = this.select('elements');

  updateElement(updatedElement: { position: number; name: string; weight: number; symbol: string }) {
    this.set('elements', (state) => {
      const elements = state.elements || [];
      return elements.map((el) =>
        el.position === updatedElement.position ? updatedElement : el
      );
    });
  }

  filterElements(filterValue: string): void {
    this.set({ filter: filterValue });
  }

  selectFilteredElements(): Observable<singleElement[]> {
    return combineLatest([this.select('elements'), this.select('filter')]).pipe(
      map(([elements, filter]) => {
        const filterValue = filter ? filter.toLowerCase() : '';
        return elements.filter((element: singleElement) =>
          element.name.toLowerCase().includes(filterValue) || element.weight.toString().includes(filterValue) || element.symbol.toLowerCase().includes(filterValue)
        );
      })
    );
  }
}