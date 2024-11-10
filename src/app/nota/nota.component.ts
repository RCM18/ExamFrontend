import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { Curso } from '../models/alumno';
import { Alumno } from '../models/curso';
import { Nota } from '../models/nota';
import { CursoService } from '../services/curso.service';
import { AlumnoService } from '../services/alumno.service';
import { NotaService } from '../services/nota.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  alumnos:Alumno[]=[];
  cursos:Curso[]=[];
  nota_1:Nota1[]=[];
  nota_2:Nota2[]=[];
  nota_3:Nota3[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  nota = new Nota();
  titulo:string='';
  opc:string='';
  op = 0; 
  selectedCurso: Curso | undefined;
  selectedAlumno: Alumno | undefined;
  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private notaService:NotaService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarNotas();
    this.listarAlumnos();
    this.listasCursos();
  }
  listarAlumnoss(){
    this.alumnoService.getAlumno().subscribe((data)=>{
      this.alumnos=data;
      console.log(this.alumnos)
    });
  }
  listasCursos(){
    this.cursoService.getMarcas().subscribe((data)=>{
      this.cursos=data;
      console.log(this.cursos)
    });
  }
  listarNotas(){
    this.notaService.getNotas().subscribe((data)=>{
      this.notas=data;
    });
  }
  showDialogCreate(){
    this.titulo="Crear Nota"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number){
    this.titulo="Editar Categoría"
    this.opc="Editar"; 
   this.notaService.getNotaById(id).subscribe((data)=>{
      this.nota=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteCoche(id:number){
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Coche eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Coche',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addCoche();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editCoche();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addCoche(){
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Registrado',
        });
        this.listarNotas();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear el Coche',
        });
      },
    });    
    this.visible = false;
  }
  editCoche(){
    this.notaService.updateNota(this.nota,this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Coche Editado',
        });
        this.listarNotas();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar el Coche',
        });
      },
    });    
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.nota.id=0;
    this.nota.nota1='';
    this.nota.nota2='';
    this.nota.nota3='';
    this.nota.alumno='';
    this.nota.curso='';
  }
}