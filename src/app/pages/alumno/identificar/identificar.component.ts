import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ProcessFaceService } from 'src/app/services/process-face.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
/* import {ngForm} from '@angular/forms'; */
import { environment } from 'src/environments/environment';
import { alumno } from 'src/app/models/alumno';
import { curso } from 'src/app/models/curso';
import Swal from 'sweetalert2'
const URL = environment.urlServer;


@Component({
  selector: 'app-identificar',
  templateUrl: './identificar.component.html',
  styleUrls: ['./identificar.component.css']
})
export class IdentificarComponent implements OnInit {

  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;
  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;

  imagenes: any[] = [];
  alumnos: any = [];
  cursoT: any;
  numdni: any;
  contador = 0;
  public context!: CanvasRenderingContext2D;

  constructor(private http: HttpClient, private router: Router, private processSvc: ProcessFaceService) { }

  ngOnInit(): void {
    this.cursoT = JSON.parse(localStorage.getItem('cursoe')!);
    // console.log(this.cursoT);
  }

  deteccion(dni: any) {
    this.numdni = dni.value;
    console.log(dni.value);
    this.main();
  }

  removeVideo() {
    location.reload();
  }

  main = async () => {

    this.context = this.myCanvas.nativeElement.getContext('2d');

    var video = await navigator.mediaDevices.getUserMedia({ video: true });

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

    this.imagesLista();

    let stream = this.videoContainer.nativeElement;

    stream.srcObject = video;

    const reDraw = async () => {

      this.context.drawImage(stream, 0, 0, 640, 480);
      //1
      requestAnimationFrame(reDraw);

    }

    const processFace = async () => {

      //aqui hace la deteccion
      const detection = await faceapi.detectSingleFace(this.videoContainer.nativeElement, new faceapi.SsdMobilenetv1Options({minConfidence:0.6}))
        .withFaceLandmarks()
        .withFaceDescriptor()


      if (typeof detection === 'undefined') {
        this.contador++;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se detecto rostro!'
        })
        console.log(this.contador);
        if (this.contador === 5) {
          this.router.navigate(['evaluacionf']);
          location.href = '#/evaluacionf';
          location.reload();
        }
        return;
      }else{
        this.processSvc.descriptor(detection);
      }
    }

    //cada 2 segundos detecta rostro
    if (this.contador === 5) {
      location.href = '#/evaluacionf';
      location.reload();
    }
    setInterval(processFace, 2000);
    requestAnimationFrame(reDraw);

  }

  //compara el video con la almacenada en la base de datos
  imagesLista() {
    this.http.get<any>(`${URL}/alumno/alumnoscursobusqueda/${this.cursoT[0].idCurso}/${this.cursoT[0].Docente_idDocente}/${this.numdni}`).subscribe((res: alumno) => {
      this.alumnos = res;
      this.alumnos.forEach((alumno: any) => {
        const imageElement = document.createElement('img');
        imageElement.src = `${URL}/${alumno.Foto}`;
        imageElement.crossOrigin = '*';
        this.processSvc.processFace(imageElement, alumno.idAlumno);
      })
    })
  }

  salir() {
    localStorage.removeItem('cursoe');
    this.router.navigate(['evaluacion']);
  }


}
