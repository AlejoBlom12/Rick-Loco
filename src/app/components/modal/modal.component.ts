import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() detalles: any;
  @Output() cerrarModalClick = new EventEmitter<void>();

  cerrarModal(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrarModalClick.emit();
    }
  }

  getEpisodeNumber(episodioUrl: string): string {
    const matches = episodioUrl.match(/\/(\d+)$/);
    return matches ? matches[1] : 'Desconocido';
  }

  cerrar(): void {
    this.cerrarModalClick.emit();
  }
}