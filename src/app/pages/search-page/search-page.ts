import { Component, inject } from '@angular/core';
import { ApiAccountsService, Account } from '../../api';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
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
