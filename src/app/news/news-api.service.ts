import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private chave:string = "a192006ac51443b085001c4a7485c2e0";
  private caminhoPadrao:string = "https://newsapi.org/v2";


  constructor(public http:HttpClient) { }

  public getEverythingAbout(assunto:string, page = 1, resultsPerPage=20){
    let result = `${this.caminhoPadrao}/everything?q=${assunto}&pageSize=${resultsPerPage}&language=pt&page=${page}&apiKey=${this.chave}`;
    console.log(result);
    return this.http.get(result);
  }
}
