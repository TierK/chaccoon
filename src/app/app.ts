// app.ts
import { ChangeDetectionStrategy, Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common'; // NgForOf, NgIf
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { ApiAccountsService } from './api/services/api-accounts.service'; 
import { Account } from './api/models/account';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProfileCard,
    JsonPipe,
    ProfileCard,
    NgForOf,
    NgIf, 
    AsyncPipe, 
    NgOptimizedImage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'chaccoon';

  private apiAccountService: ApiAccountsService = inject(ApiAccountsService); 
  accounts: Account[] = [];

  constructor() {
  
  }

  ngOnInit(): void {
    this.apiAccountService.getTestAccounts().subscribe({
      next: (data: Account[]) => {
        this.accounts = data;
        console.log('Test profiles loaded from generated API:', this.accounts);
      },
      error: (err) => {
        console.error('Error loading profiles from generated API:', err);
      }
    });
  }
}