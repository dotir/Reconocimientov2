import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as faceapi from 'face-api.js';
import { AccessService } from './access.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessFaceService {

  idImage: any;
  imageDescriptors: any = [];
  faceMatcher: any;

  constructor(private http:HttpClient,private router:Router, private acessSvc:AccessService) { }

  async processFace(image: any, id: string) {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

    const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()
    if (typeof detection === 'undefined') return;

    this.imageDescriptors.push({
      id: id,
      detection
    });
    //aqui empieza a hacer la comparacion 
    this.faceMatcher = new faceapi.FaceMatcher(this.imageDescriptors.map(

      (faceDescriptor: any) => (

        new faceapi.LabeledFaceDescriptors(

          (faceDescriptor.id).toString(),[faceDescriptor.detection.descriptor]

        )
      )
    ))
  }

  descriptor(detection:any){

    if(detection){
      const bestMatch = this.faceMatcher.findBestMatch(detection.descriptor);
      this.idImage = bestMatch.label;
      this.passwordImg(this.idImage);
    }
  }
  passwordImg(id:string){

    this.acessSvc.accessoPassword(id);

  }
}
