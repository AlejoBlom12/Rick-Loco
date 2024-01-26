import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent implements OnInit, OnDestroy {
  public personajes: any[] = [];
  public mostrarModal = false;
  public personajeSeleccionado: any;
  public filtroNombre: string = '';
  public currentPage = 1;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (!this.filtroNombre && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.cargarMasPersonajes();
    }
  }

  actualizarFiltroNombreEnTiempoReal(): void {
    this.rickAndMortyService.buscarPersonajesEnTiempoReal(this.filtroNombre)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.personajes = data.results;
      });
  }

  cargarPersonajes(): void {
    this.rickAndMortyService.mostrarPersonajes(this.currentPage).subscribe(data => {
      this.personajes = this.personajes.concat(data.results);
    });
  }

  verDetallesPersonaje(character: any): void {
    this.personajeSeleccionado = character;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  cargarMasPersonajes(): void {
    this.currentPage++;
    this.cargarPersonajes();
  }
}