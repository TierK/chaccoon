import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SvgIcons } from '../svg-icons/svg-icons';
import { CommonModule } from '@angular/common';

// This component represents a sidebar in the application.
// It includes a logout button that calls the logout method from the AuthService when clicked.
@Component({
  selector: 'app-sidebar',
  imports: [SvgIcons, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true
})
export class Sidebar {
  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }

  menuItems=[
    {
      lable: 'Home Page',
      icon: 'home',
      link: ''
    },
    {
      lable: 'Chats',
      icon: 'chat',
      link: 'chats'
    },
    {
      lable: 'Search',
      icon: 'search',
      link: 'search'
    }
  ]
}

