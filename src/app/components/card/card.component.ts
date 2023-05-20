import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;

  constructor (
    private router: Router
  ) { }

  goToCard(){
    this.router.navigate([`./card/${this.card.id}`]);
  }
}
