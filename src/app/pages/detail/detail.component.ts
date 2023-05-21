import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  id!:string;
  card$!:Observable<Card>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardSvce: CardService
  ) { }

  ngOnInit():void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    // this.cardSvce.getCardById(this.id).subscribe( res => {

    // });

    // en vez de suscribirme al observable, es comun crear un observable como variable ( en este caso card$)
    // esto es porque lo recomendable es subscribirnos al observable y al terminar de usarlo, desubscribirse.
    // para hacer esto mas simple, hacemos:

    this.card$ = this.cardSvce.getCardById(this.id);

  }

  goBack(){
    this.router.navigate(['']);
  }

}
