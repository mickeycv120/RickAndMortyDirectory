import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Character } from '../../Types/characterType';
import { RickMortyService } from '../../api/api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-details-modal',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './details-modal.html',
  styleUrl: './details-modal.css',
})
export class DetailsModal implements OnInit {
  episodes$: Observable<any[]> = of([]);

  constructor(
    public dialogRef: MatDialogRef<DetailsModal>,
    @Inject(MAT_DIALOG_DATA) public data: { character: Character },
    private rickMortyService: RickMortyService
  ) {}

  ngOnInit(): void {
    // Cargar información detallada de los episodios
    if (this.data.character.episode && this.data.character.episode.length > 0) {
      this.episodes$ = this.rickMortyService.getEpisodesByUrls(this.data.character.episode);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-100 text-green-800';
      case 'dead':
        return 'bg-red-100 text-red-800';
      case 'unknown':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getEpisodeNumber(episodeUrl: string): string {
    // Extrae el número del episodio de la URL
    const match = episodeUrl.match(/\/(\d+)$/);
    return match ? `E${match[1]}` : '';
  }
}
