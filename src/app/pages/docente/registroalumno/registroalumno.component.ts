import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const URL = environment.urlServer;

@Component({
  selector: 'app-registroalumno',
  templateUrl: './registroalumno.component.html',
  styleUrls: ['./registroalumno.component.css']
})
export class RegistroalumnoComponent implements OnInit {

  urls = URL;
  alumno = { Nombre: '', Apellido: '', dni: '', email: '', Password: '' };
  file: any = null;
  preview: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e: any) => { this.preview = e.target.result; };
    }
  }

  registrar() {
    if (!this.alumno.Nombre || !this.alumno.Apellido || !this.alumno.dni) {
      Swal.fire('Formulario incompleto', 'Ingresa nombre, apellido y DNI', 'warning');
      return;
    }
    const fd = new FormData();
    fd.append('Nombre', this.alumno.Nombre);
    fd.append('Apellido', this.alumno.Apellido);
    fd.append('dni', this.alumno.dni);
    fd.append('email', this.alumno.email);
    fd.append('Password', this.alumno.Password);
    if (this.file) fd.append('file', this.file);

    this.http.post(`${URL}/alumno`, fd).subscribe(
      () => {
        Swal.fire('Registrado', 'Alumno agregado correctamente', 'success').then(() => {
          this.alumno = { Nombre: '', Apellido: '', dni: '', email: '', Password: '' };
          this.file = null;
          this.preview = null;
        });
      },
      () => Swal.fire('Error', 'No se pudo registrar el alumno. Intente de nuevo.', 'error')
    );
  }
}