import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(
    private http: HttpClient,
  ) { }

  getCards(name: string | null, offset = 0){

    const params = {
      num: 100,
      offset: offset,

      // podria poner offset solo ya que es el mismo nombre y angular lo entiende
    };
    if (name) params.fname = name;

    return this.http.
      get<Card[]>(this.API_URL,{params}).
      pipe(map( (res: any) => res.data));
  }

  // ahora podria crear una nueva funcion para la request de la busqueda
  // pero lo voy a hacer en la misma request de getCards(), pidiendole un name que puede ser string | null

}
