import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Imagenes } from 'src/app/models/images-interface';
import { alumno } from 'src/app/models/alumno';
import { LocationStrategy } from '@angular/common';
import { docente } from 'src/app/models/docente';
import { curso } from 'src/app/models/curso';
/* import { Sequential } from '@tensorflow/tfjs-node';
 */
const URL = environment.urlServer;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  urls=URL;
  images = '';
  imgURL = '../../../assets/img/noimage.png';
  imagenes: any = [];
  alumn: any = [];

  imagenesData: Imagenes[] = [];
  alumnosData: alumno[] = [];

  imgProcess: any = [];
  file: any;
  fotito = '';
  //fotos
  nombre = '';
  foto = '';
  dni1:any;
  dni:any;


  @ViewChild('imagesList', { static: true }) imagesList!: ElementRef;

  /*   imagenesForm = this.fb.group({

      nombre: ['', [Validators.required]],
      imgFile: ['']

    }) */

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.mostrarImg()
  }


  getDni(inputValue: String) {
    this.http.get<any>(`${URL}/alumno/${inputValue}`).subscribe(res => {

      localStorage.removeItem('alumnoc');
      localStorage.setItem('alumnoc',JSON.stringify(res))
      this.nombre = res[0].Nombre;
      this.foto = res[0].Foto;

    })
  }


  selectImage(event: any) {

    if (event.target.files.length > 0) {

      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event: any) => {

        this.imgURL = event.target.result;
        //  this.imgElement = event.target.result;
        //  elementImage.src = `${this.imgElement}`;

        this.images = this.file;
        // this.imagen = {
        //   archivo: this.file[0]
        // }

      }
    }

  }


  processFace = async (image: any, imageContainer: any) => {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');


    const detection = await faceapi.detectSingleFace(image, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (typeof detection === 'undefined') {


      imageContainer.querySelector('.status').innerText = 'No se pudo procesar la imagen';
      imageContainer.querySelector('.status').style.color = 'red';

      /* setTimeout(() => {
        imageContainer.querySelector('.status').innerText = '';
        this.imgURL = '../../../assets/img/noimage.png';
        this.imagenesForm.reset();

      }, 2000); */

      /* this.btnActive = false; */

    } else {

      imageContainer.querySelector('.status').innerText = 'Procesado';
      imageContainer.querySelector('.status').style.color = 'blue';
      /*       this.onSubmit();

            setTimeout(() => {
              imageContainer.querySelector('.status').innerText = '';


            }, 3000); */

    }


  }

  mostrarImg() {
    const id:docente = JSON.parse(localStorage.getItem('id')!);
    const idc:curso = JSON.parse(localStorage.getItem('curso')!);
    this.http.get<any>(`${URL}/alumno/alumnoscurso/${id.idDocente}/${idc.idCurso}`).subscribe((res: alumno) => {
      this.imagenes = res;
      this.imagenesData = [];
      this.imagenes.forEach((element: alumno) => {
        this.alumnosData.push({
          ...element
        })
      })
    })
  }


  onSubmit() {

    let idcurso = JSON.parse(localStorage.getItem('curso')!);
    let idalumno = JSON.parse(localStorage.getItem('alumnoc')!);

    this.http.get(`${URL}/alumno/agregaralumno/${idcurso.idCurso}/${idalumno[0].idAlumno}`).subscribe(
      res => {
        location.reload();
      })

  }


  eliminar(id: any) {
    let idcurso = JSON.parse(localStorage.getItem('curso')!);
    Swal.fire({
      icon: 'question',
      title: 'Desea eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('id:' + id);
        this.http.delete<any>(`${URL}/alumno/${id}/${idcurso.idCurso}`).subscribe(res => {
          console.log(res);
          location.reload();
        })
      }
    })
  }
}
