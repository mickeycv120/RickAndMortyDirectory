import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, FormsModule, RouterModule],
  templateUrl: './header.html',
  encapsulation: ViewEncapsulation.None,
})
export class Header {
  @Input() filters: any = {
    name: '',
    status: '',
    species: '',
  };
  @Input() totalCount: number = 0;
  @Output() filtersChange = new EventEmitter<any>();

  // Registrar el icono Heart para este componente
  readonly Heart = Heart;

  onFiltersChange(newFilters: any) {
    this.filtersChange.emit(newFilters);
  }

  toggleFavorites() {
    const newFilters = {
      ...this.filters,
      showFavorites: !this.filters.showFavorites,
      // Limpiar otros filtros cuando se activan favoritos
      ...(this.filters.showFavorites ? {} : { name: '', status: '', species: '' }),
    };
    this.filters = newFilters;
    this.filtersChange.emit(newFilters);
  }
}
