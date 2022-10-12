import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Imagenes } from 'src/app/models/images-interface';
import { alumno } from 'src/app/models/alumno';
/* import { Sequential } from '@tensorflow/tfjs-node';
 */
const URL = environment.urlServer;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  /*  imgElement = ''; */
  images = '';
  imgURL = '../../../assets/img/noimage.png';
  imagenes: any = [];
  alumn:any=[];
  /*   imagen: any; */
  imagenesData: Imagenes[] = [];
  alumnosData: alumno[]=[];
  /*   imgProcess: any; */
  btnActive = true;
  imgProcess: any = [];
  file: any;
  fotito='http://localhost:3000/uploads/amy.jpg';

  @ViewChild('imagesList', { static: true }) imagesList!: ElementRef;

  /*   imagenesForm = this.fb.group({
  
      nombre: ['', [Validators.required]],
      imgFile: ['']
  
    }) */

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private renderer: Renderer2, private imagenesSvc: ImagenesService) { }

  ngOnInit(): void {
    this.mostrarImg()
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

      this.btnActive = false;

      /* var containerImage = document.createElement('div');
      var status = document.createElement('p');
      var icon = document.createElement('i');
      var elementImage = document.createElement('img');


      containerImage.classList.add('containerImage');

      elementImage.crossOrigin = 'anonymous';

      icon.classList.add('fa');
      icon.classList.add('fa-3x');
      icon.classList.add('fa-spinner');
      icon.classList.add('fa-pulse');

      status.classList.add('status');

      status.appendChild(icon)

      containerImage.appendChild(status);

      this.imgProcess = elementImage;


      this.renderer.appendChild(this.imageFile.nativeElement, containerImage);

      this.processFace(this.imgProcess, containerImage); */

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


    this.http.get<any>(`${URL}/upload`).subscribe((res: alumno) => {
      this.imagenes = res;
      this.imagenesData = [];
      this.imagenes.forEach((element: alumno) => {
        this.alumnosData.push({
          ...element
        })
      })
    })
    /*     this.imagenesSvc.getImagenes().subscribe(res => {
    
          this.imagenesData = [];
    
          res.forEach((element: ImagenesModel) => {
    
            this.imagenesData.push({
              ...element
            })
    
          })
    
        }) */

  }


  onSubmit() {

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

        console.log('id:'+id);
        this.http.delete<any>(`${URL}/delete/${id}`).subscribe(res=>{
          location.reload();
        })
      }
    })



  }




}
