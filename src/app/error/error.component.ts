import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorCode: string | null = null;
  errorMessage: string = '';

  private errorMessages: { [key: string]: { title: string; body: string } } = {
    '404': {title: 'Страница не найдена', body: 'К сожалению, мы не смогли найти страницу, которую вы ищете'},
    '401': {title: 'Доступ запрещен', body: 'У вас нет прав на просмотр этого раздела'},
  };

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.errorCode = params.get('code');
      const message = this.errorMessages[this.errorCode || '500'];

      if (message) {
        this.errorMessage = `${message.title}: ${message.body}`;
      } else {
        this.errorMessage = 'Произошла неизвестная ошибка';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
