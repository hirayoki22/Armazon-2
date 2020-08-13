import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UserService } from '../services/user.service';
import { UserAccount } from '../models/user-account.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userAccount: UserAccount;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private us: UserService
  ) { 
    this.title.setTitle(this.route.snapshot.data['title']); 
  }

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
