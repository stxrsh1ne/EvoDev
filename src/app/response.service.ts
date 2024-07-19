import { Injectable } from '@angular/core';
import { ResponseData } from './response-data';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private data: ResponseData[] = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false
    }
  ];

  getData(): ResponseData[] {
    return this.data;
  }
}
