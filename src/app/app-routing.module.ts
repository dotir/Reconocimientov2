import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './pages/docente/upload/upload.component';
import { HomeComponent } from './pages/home/home.component';
import { IdentificarComponent } from './pages/alumno/identificar/identificar.component';
import { DeteccionComponent } from './pages/alumno/deteccion/deteccion.component';
import { LoginComponent} from './pages/docente/login/login.component';
import { EvaluacionComponent } from './pages/alumno/evaluacion/evaluacion.component';
import { HomedocenteComponent } from './pages/docente/homedocente/homedocente.component';
import { RegistroComponent } from './pages/docente/registro/registro.component';
import { CursoComponent } from './pages/docente/curso/curso.component';
import { EvaluacionfComponent } from './pages/alumno/evaluacionf/evaluacionf.component';
import { DashbordcursoComponent } from './pages/docente/dashbordcurso/dashbordcurso.component';
import { ExamenComponent } from './pages/docente/examen/examen.component';
const routes: Routes = [

  {path: 'home', component:HomeComponent},
  {path: 'upload', component:UploadComponent},
  {path: 'identificar', component:IdentificarComponent},
  {path: 'deteccion', component:DeteccionComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'evaluacion', component:EvaluacionComponent},
  {path: 'menu', component:HomedocenteComponent},
  {path: 'curso', component:CursoComponent},
  {path: 'evaluacionf', component:EvaluacionfComponent},
  {path: 'dash', component:DashbordcursoComponent},
  {path:'examen',component:ExamenComponent},
  {path:'', pathMatch:'full', redirectTo:'/home'},
  {path:'**', pathMatch:'full', redirectTo:'/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
