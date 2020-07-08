import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const url = 'http://127.0.0.1/market-api/products.php';

    fetch(url)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err.message()));
  }

}
