import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
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

  cardTextFC = new FormControl('');

  constructor (
    private cardSvce: CardService
  ) { }

  ngOnInit():void {
    this.searchCards();
    this.cardTextFC.valueChanges
    .pipe( debounceTime(2000) )
    .subscribe( res => {
      if (this.cardTextFC.value !== '') {
        this.searchCardName(res!);
      } else {
        this.cards = [];
        this.offset = 0;
        this.searchCards();
      }
    });
  }

  onScroll(){
    if (this.cardTextFC.value === ''){
      this.offset += 100;
      this.searchCards();
    }
  }

  searchCards(){
    // if (this.cardTextFC.value === ''){
      this.cardSvce.getCards(this.offset).subscribe( res => {
        this.cards = [...this.cards, ...res];

        // este ... es el spread operator, de esta manera no reemplaza, es un merge o una mezcla entre las dos respuestas

      });
    // }
  }

  searchCardName(name:string){
    this.cardSvce.getCardsByName(name).subscribe( res => { this.cards = res} );
  }
}
