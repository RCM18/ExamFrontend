import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coche } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl='http://localhost:8080/api/notas';
  constructor(private http:HttpClient) { }

  getNota():Observable<Nota[]>{
    return this.http.get<Nota[]>(this.apiUrl);
  }

  getNotaById(id:number):Observable<Nota>{
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  crearNota(nota:Nota):Observable<Nota>{
    return this.http.post<Nota>(this.apiUrl, nota);
  }
  
  deleteNota(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateNota(nota:Nota, id:number):Observable<Nota>{
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }
}