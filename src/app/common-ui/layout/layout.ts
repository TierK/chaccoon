import { Component, OnInit  } from '@angular/core';
import{ RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { ApiAccountsService } from '../../api/services/api-accounts.service';
import { Account } from '../../api/models/account';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  currentUser: Account | null = null;

  constructor(private apiAccounts: ApiAccountsService) {}

  ngOnInit(): void {
    this.apiAccounts.getMyAccount().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('CURRENT USER:', user);
      },
      error: (err) => {
        console.error('❌ Failed to load current user', err);
      }
    });
  }
}