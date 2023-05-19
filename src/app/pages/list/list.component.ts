import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  cards: Card[] = [];
  offset:number = 0;

  constructor (
    private cardSvce: CardService
  ) { }

  ngOnInit():void {
    this.searchCards();
  }

  onScroll(){
    console.log('scrolled!!!');
    this.offset += 100;
    this.searchCards();
  }

  searchCards(){
    this.cardSvce.getCards(this.offset).subscribe(res => {
      console.log(res);
      this.cards = [...this.cards, ...res];

      // este ... es el spread operator, de esta manera no reemplaza, es un merge o una mezcla entre las dos respuestas

    });
  }
}
