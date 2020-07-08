import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCountSource$: Observable<number>; 

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.itemCountSource$ = this.cs.itemCountSource$;
  }

}
