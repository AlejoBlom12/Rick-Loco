import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private searchUrl = 'https://rickandmortyapi.com/api/character/?name=';

  constructor(private http: HttpClient) {}

  mostrarPersonajes(page?: number): Observable<any> {
    const url = page ? `${this.apiUrl}/?page=${page}` : this.apiUrl;
    return this.http.get(url);
  }

  mostrarDetallesPersonaje(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  buscarPersonajesEnTiempoReal(nombre: string): Observable<any> {
    const url = `${this.searchUrl}${nombre}`;
    return this.http.get(url);
  }
}