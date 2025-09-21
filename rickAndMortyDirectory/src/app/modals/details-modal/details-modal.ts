import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from '../../Types/characterType';

@Component({
  selector: 'app-details-modal',
  imports: [MatDialogModule],
  templateUrl: './details-modal.html',
  styleUrl: './details-modal.css',
})
export class DetailsModal {
  constructor(
    public dialogRef: MatDialogRef<DetailsModal>,
    @Inject(MAT_DIALOG_DATA) public data: { character: Character }
  ) {}

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
