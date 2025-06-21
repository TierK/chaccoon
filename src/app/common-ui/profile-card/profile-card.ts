import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Account } from '../../api/models/account';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [NgIf, NgOptimizedImage],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProfileCard {
  @Input() profileData!: Account;
}
