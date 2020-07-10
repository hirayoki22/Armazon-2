import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'marketplace';

  ngOnInit(): void {
    this.getShoppingCart();
    // this.addToCart();
  }

  getShoppingCart(): void {
    const formData = new FormData();
    formData.append('userId', '1');

    fetch('http://127.0.0.1/market-api/shopping-cart.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
  }

  addToCart(): void {
    const formData = new FormData();
    formData.append('userId', '1');
    formData.append('productId', '8');
    formData.append('quantity', '1');

    fetch('http://127.0.0.1/market-api/shopping-cart.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
  }
}
