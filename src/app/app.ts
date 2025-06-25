// app.ts
import { ChangeDetectionStrategy, Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common'; // NgForOf, NgIf
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    NgOptimizedImage,
    RouterModule // Import RouterModule for routing
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
[x: string]: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  protected title = 'chaccoon';
  
}