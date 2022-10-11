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
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/docente/registro/registro.component';
import { EvaluacionComponent } from './pages/alumno/evaluacion/evaluacion.component';
import { CursoComponent } from './pages/docente/curso/curso.component';
import { Evaluacion3Component } from './pages/alumno/evaluacion3/evaluacion3.component';
import { HomedocenteComponent } from './pages/docente/homedocente/homedocente.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

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
    Evaluacion3Component,
    HomedocenteComponent,
    SidebarComponent  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
