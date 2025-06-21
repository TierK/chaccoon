// app.ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common'; // Убедитесь, что JsonPipe импортирован!

// Импортируем ваш существующий компонент ProfileCard (если он используется в шаблоне)
import { ProfileCard } from "./common-ui/profile-card/profile-card";

// --- ИМПОРТЫ ИЗ СГЕНЕРИРОВАННОГО API ---
// ПУТЬ ВАЖЕН! Проверьте папку 'api', которую создал ng-openapi-gen.
// Если ваш сгенерированный сервис называется ProfilesService:
import { ApiAccountsService } from './api/services/api-accounts.service'; // <--- ИЗМЕНЕНО: ProfilesService
import { Account } from './api/models/account'; // Модель, вероятно, осталась Account, как в вашей схеме
// ---------------------------------------------


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileCard, // Ваш компонент ProfileCard
    JsonPipe // JsonPipe должен быть в imports для автономного компонента!
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'chaccoon';

  // Внедряем СГЕНЕРИРОВАННЫЙ ProfilesService
  private profilesService: ApiAccountsService = inject(ApiAccountsService); // <--- ИЗМЕНЕНО: profilesService

  // Указываем тип для profiles, используя сгенерированную модель Account
  profiles: Account[] = [];

  constructor() {
    // Конструктор лучше оставить пустым для внедрения зависимостей.
  }

  ngOnInit(): void {
    // Вызываем метод для получения ТЕСТОВЫХ аккаунтов.
    // Если operationId для /accounts/test_accounts у вас getTestAccounts,
    // то так и будет: this.profilesService.getTestAccounts()
    this.profilesService.getTestAccounts().subscribe({ // <--- ИЗМЕНЕНО: profilesService
      next: (data: Account[]) => {
        this.profiles = data;
        console.log('Test profiles loaded from generated API:', this.profiles);
      },
      error: (err) => {
        console.error('Error loading profiles from generated API:', err);
      }
    });

    // Если вам нужны данные из /accounts (operationId: getAllAccounts),
    // то метод будет this.profilesService.getAllAccounts():
    /*
    this.profilesService.getAllAccounts().subscribe({
      next: (data: Account[]) => {
        // ... ваша логика для всех аккаунтов
      },
      error: (err) => {
        // ... обработка ошибок
      }
    });
    */
  }
}