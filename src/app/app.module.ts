import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './pages/docente/upload/upload.component';
import { IdentificarComponent } from './pages/alumno/identificar/identificar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { DeteccionComponent } from './pages/alumno/deteccion/deteccion.component';
import { LoginComponent } from './pages/docente/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/docente/registro/registro.component';
import { EvaluacionComponent } from './pages/alumno/evaluacion/evaluacion.component';
import { CursoComponent } from './pages/docente/curso/curso.component';
import { HomedocenteComponent } from './pages/docente/homedocente/homedocente.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EvaluacionfComponent } from './pages/alumno/evaluacionf/evaluacionf.component';
import { DashbordcursoComponent } from './pages/docente/dashbordcurso/dashbordcurso.component';
import { ExamenComponent } from './pages/docente/examen/examen.component';
import { VeringresantesComponent } from './pages/docente/veringresantes/veringresantes.component';
import { PerfilComponent } from './pages/docente/perfil/perfil.component';
import { DatoscursoComponent } from './pages/docente/datoscurso/datoscurso.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    IdentificarComponent,
    NavbarComponent,
    HomeComponent,
    DeteccionComponent,
    LoginComponent,
    RegistroComponent,
    EvaluacionComponent,
    CursoComponent,
    HomedocenteComponent,
    SidebarComponent,
    FooterComponent,
    EvaluacionfComponent,
    DashbordcursoComponent,
    ExamenComponent,
    VeringresantesComponent,
    PerfilComponent,
    DatoscursoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
