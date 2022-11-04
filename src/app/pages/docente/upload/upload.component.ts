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
/* import { Sequential } from '@tensorflow/tfjs-node';
 */
const URL = environment.urlServer;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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
  dni1 = '';

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
        /* this.imgElement = event.target.result; */
        /* elementImage.src = `${this.imgElement}`; */

        this.images = this.file;
        /* this.imagen = {
          archivo: this.file[0]
        } */

      }
    }

  }


  processFace = async (image: any, imageContainer: any) => {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');


    const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
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
    this.http.get<any>(`${URL}/alumnoscurso/1`).subscribe((res: alumno) => {
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


    /* this.nombre=''; */
    /* this.foto=''; */
    let formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>(`${URL}/file`, formData).subscribe(
      res => { location.reload(); })
    /* Swal.fire({
      title: 'busqueda',
      input:'text'

    }).then((dni)=>{
      if(!dni) throw null;

      this.http.get<any>(`${URL}/alumno/${dni.value}`).subscribe(res=>{
        console.log(res);
        const nombre = res[0].Nombre;
        const foto = res[0].Foto;
        console.log(nombre);
        console.log(foto);

      })
    }) */



    /*
        let codigoestudiante = '';
     */
    /* let formData = new FormData();
    Swal.fire({
      title: 'Introducir el password',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar'
    }).then((re) => {
      if (re.isConfirmed && re.value) {
        formData.append('file', this.images);
        formData.append('password', re.value);
        this.http.post<any>(`${URL}/file`, formData).subscribe(
          res => {
            Swal.fire({

              icon: 'success',
              title: 'Datos cargados correctamente',
              text: 'La imagen y pass se subio correctamente'
            }).then(() => {

              if (res) {
                location.reload();
              }

            })

          })
      } else {
        Swal.fire('Error', 'Debe llenar el password', 'error');
      }
    });
 */



    /*     Swal.fire({
          title: 'Introducir el nombre de la imagen',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          allowOutsideClick: false

        }).then((result) => {
          if (result.isConfirmed && result.value) {
            let cargarImagenDatos: any = {
              nombreImagen: result.value
            }

            Swal.fire({
              title: 'Ingrese el codigo Estudiante',
              input: 'text'
            }).then((result) =>{
                if(result){
                  codigoestudiante=result.value
                  this.imagenesSvc.cargarImagenesFirebase(this.imagen, cargarImagenDatos,codigoestudiante);
                  Swal.fire({
                    icon: 'success',
                    title: 'La imagen se cargo',
                    text: 'En breve aparecera la imagen cargada'
                    }).then((result) => {

                      if (result) {
                        this.imgURL = '../../../assets/img/noimage.png';
                        this.imagenesForm.reset();
                      }

                    })
                }
            })


          } else {

            if (!result.isConfirmed && !result.value) {
              location.reload();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe llenar el nombre',
                confirmButtonText: 'OK'

              }).then((result) => {
                this.imagenesForm.reset();
              })
            }

          }

        }) */

  }


  eliminar(id: any) {


    Swal.fire({
      icon: 'question',
      title: 'Desea eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('id:' + id);
        this.http.delete<any>(`${URL}/delete/${id}`).subscribe(res => {
          location.reload();
        })
      }
    })
  }
}
