<?php

function sendPuchaseConfirmation($firstName, $email, $orderTotal) {
  $body = '
    <div style="
    max-width: 600px; 
    min-height: 450px; 
    margin: 3rem auto; 
    padding: 1rem; 
    color: #fff;
    font-family: Helvetica, Arial, sans-serif, san-serif;
    font-size: 1rem;
    background-color: #1c1a1d; 
    border: thin solid #2f2c31; 
    overflow: hidden;
    z-index: 1;">

      <h1 style="
      margin-bottom: 4rem;
      color: #f72828;
      font-size: 4rem;
      font-weight: 700;
      text-transform: uppercase;    
      text-align: center;    
      white-space: nowrap;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      transition: font-size .3s ease;">FX <span style="color: #fff;">PRO</span></h1>

      <p style="text-align: center;">Hi, '.$firstName.'. Thank you for your purchase!</p>

      <div style="margin: 4rem 0;">
        <p style="text-align: center;">Order total: <strong style="font-size: 1.5rem;">$'.$orderTotal.'</strong></p>
      </div>

      <div>
        <ul style="
        display: flex;
        align-items: center;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 2rem;
        list-style: none;
        font-size: 0.9rem;
        letter-spacing: normal;
        z-index: 2;">
          <li style="margin-right: 0.5rem;">
              <a style="color: #fff; text-decoration: none;" href="http://fxfactorydr.com/" target="_blank">Fx Factory DR</a></li>
          <li>
              <a style="color: #fff; text-decoration: none;"" href="https://www.instagram.com/fxfactorydr/" target="_blank">@fxfactorydr</a>
          </li>
        </ul>
      </div>
    </div>
  ';

  $from = (object)[
    'email' => 'info@fxfactorydr.com',
    'name'  => 'FxFactory DR'
  ];

  $to = (object)[
    'email' => $email,
    'name'  => $firstName
  ];

  $buyerEmail = new Email(
    'a2plcpnl0610.prod.iad2.secureserver.net',
    'info@fxfactorydr.com',
    'R#ecn@#27s9#',
    587,
    $from, 
    $to,
    'Transaction Details - FxFactory DR',
    $body
  );
  
  $sellerEmail = new Email(
    'a2plcpnl0610.prod.iad2.secureserver.net',
    'info@fxfactorydr.com',
    'R#ecn@#27s9#',
    587,
    $from, 
    (object)[
      'email' => 'hirayoki.nova@gmail.com',
      'name'  => 'Dear seller'
    ],
    'New Sale - FxFactory DR',
    'You got a new sale for: $'.$orderTotal.' <br><br>Check your paypal account for more details'
  );

  $buyerEmail->sendEmail();
  $sellerEmail->sendEmail();
}