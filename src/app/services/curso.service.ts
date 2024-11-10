import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl='http://localhost:8080/api/cursos';
  constructor(private http:HttpClient) { }

  getCurso():Observable<Curso[]>{
    return this.http.get<Curso[]>(this.apiUrl);
  }
}
