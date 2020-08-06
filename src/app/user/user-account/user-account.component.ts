import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(private us: UserService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.us.logoutRequest().subscribe(res => {
      location.href = '/';
    });
  }
}
