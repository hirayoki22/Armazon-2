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
  isLoading: boolean = true;

  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.us.getUserAccount().subscribe(userAccount => {
      this.userAccount = userAccount;
      this.isLoading = false;
    });
  }

  onLogout(): void {
    this.us.logoutRequest().subscribe(res => {
      location.href = '/';
    });
  }
}
