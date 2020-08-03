import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marketplace';

  ngOnInit(): void {
    fetch('market-api/products.php/1')
    .then(res => res.json())
    .then(res => console.log(res));
  }
}
