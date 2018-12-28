import { endpoints } from './../endpoints';
import { Pizza } from 'src/app/Models/Pizza';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sucursal } from 'src/app/Models/Sucursal';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = endpoints.urlApi + 'Image/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private _http: HttpClient) { }

  public uploadImage(endpoint: string, imageFile: File) {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('file', imageFile);
    return this._http.post(this.baseUrl + endpoint, uploadData).pipe();
  }

  public deleteImage(endpoint: string, filename: string) {
    return this._http.delete(this.baseUrl + endpoint + '/' + filename).pipe();
  }
}
