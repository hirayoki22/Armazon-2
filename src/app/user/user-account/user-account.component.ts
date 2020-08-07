import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserAccount } from '../user-account.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userAccount: UserAccount;

  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.us.getUserAccount().subscribe();
  }

  onLogout(): void {
    this.us.logoutRequest().subscribe(res => {
      location.href = '/';
    });
  }
}
