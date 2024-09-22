import { Component } from '@angular/core';;
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from "./components/filter/filter.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent, FilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ElementTable';
}
