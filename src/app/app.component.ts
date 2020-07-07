import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marketplace';

  placeOrder(): void {    
    const formData = new FormData();
    const order = [
      { productId: 'ANAJFBAJX45', quantity: 1, price: 40.66 },
      { productId: 'BAFHAR785PD', quantity: 3, price: 18.95 },
      { productId: 'RTY458PO660', quantity: 2, price: 60.63 },
    ];

    formData.append('firstName', 'Minelva');
    formData.append('lastName', 'Alvarez');
    formData.append('email', 'hirayoki22.nova@gmail.com');
    formData.append('order', JSON.stringify(order));
    
    fetch('http://127.0.0.1/market-api/purchases.php',{
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(res => console.log(res));
  }
}
