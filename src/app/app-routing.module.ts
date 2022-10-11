import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { HomeComponent } from './pages/home/home.component';
import { IdentificarComponent } from './pages/identificar/identificar.component';
import { DeteccionComponent } from './pages/deteccion/deteccion.component';
import { LoginComponent} from './pages/login/login.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { Evaluacion3Component } from './pages/evaluacion3/evaluacion3.component';
import { HomedocenteComponent } from './pages/homedocente/homedocente.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CursoComponent } from './pages/curso/curso.component';
const routes: Routes = [

  {path: 'home', component:HomeComponent},
  {path: 'upload', component:UploadComponent},
  {path: 'identificar', component:IdentificarComponent},
  {path: 'deteccion', component:DeteccionComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'evaluacion', component:EvaluacionComponent},
  {path: 'evaluacion3', component:Evaluacion3Component},
  {path: 'menu', component:HomedocenteComponent},
  {path: 'curso', component:CursoComponent},

  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'**', pathMatch:'full', redirectTo:'home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
