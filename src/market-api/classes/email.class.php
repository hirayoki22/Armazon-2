<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './include/vendor/autoload.php';

class Email {
  private $host;
  private $username;
  private $password;
  private $port;
  private $from;
  private $to;
  private $subject;
  private $body;
  private $AltBody;
  const EMAIL_SENT = 'Email has been sent!';
  const EMAIL_ERR = 'Email could not be sent. Mailer Error: ';
  
  public function __construct(
    string $host,
    string $username,
    string $password,
    int    $port,
    object $from,
    object $to,
    string $subject,
    string $body,
    string $AltBody = ''
  ) {
    $this->host = $host;
    $this->username = $username;
    $this->password = $password;
    $this->port = $port;
    $this->from = $from;
    $this->to = $to;
    $this->subject = $subject;
    $this->body = $body;
    $this->AltBody = !empty($AltBody) ? $AltBody : 'Email content placeholder';
  }

  public function sendEmail() {
    $mail = new PHPMailer(true);

    try {
      // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                    
      $mail->isSMTP();                                           
      $mail->Host       = $this->host;                   
      $mail->SMTPAuth   = true;                                  
      $mail->Username   = $this->username;                     
      $mail->Password   = $this->password;                               
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       
      $mail->Port       = $this->port;                 
      $mail->SMTPSecure = 'tls';                   

      $mail->setFrom($this->from->email, $this->from->name);
      $mail->addAddress($this->to->email, $this->to->name);

      $mail->isHTML(true);                                
      $mail->Subject = $this->subject;
      $mail->Body    = $this->body;
      $mail->AltBody = $this->AltBody;
      // $mail->msgHTML(file_get_contents('email.html'));
    
      $mail->send();
      return self::EMAIL_SENT;
    } catch (Exception $e) {
      return self::EMAIL_ERR.$mail->ErrorInfo;
    }
  }
}