// app.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common'; // NgForOf, NgIf
import { ProfileCard } from "./common-ui/profile-card/profile-card";
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProfileCard,
    JsonPipe,
    AsyncPipe,
    NgOptimizedImage,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App implements OnInit {
  [x: string]: any;
  ngOnInit(): void {}
    
  protected title = 'chaccoon';
  environment = environment;
}