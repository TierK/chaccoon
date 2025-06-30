import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

// This component represents a sidebar in the application.
// It includes a logout button that calls the logout method from the AuthService when clicked.
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true
})
export class Sidebar {
  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}

