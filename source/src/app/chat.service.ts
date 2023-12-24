import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatsSubject = new BehaviorSubject<any>(null);
  chats$: Observable<any> = this.chatsSubject.asObservable();

  constructor() {
    this.chatsSubject.next({
      "currentUser": {
        "image": {
          "png": "../assets/profiles/Shahrzad Javadi 1 (2).JPG"
        },
        "username": "Shahrzad"
      },
      "chats": [
        {
          "id": 1,
          "user": {
            "image": {
              "png": "../assets/profiles/Shahrzad Javadi 1 (2).JPG"
            },
            "username": "Shahrzad"
          },
          "content": "Hey Max! wanna hang out tonight?",
          "sign": "../assets/signs/Ellipse 3.png"
        },
        {
          "id": 2,
          "user": {
            "image": {
              "png": "../assets/profiles/ali.jpg"
            },
            "username": "Ali"
          },
          "content": "LGTM",
          "sign": "../assets/signs/tick 2.png"
        },
        {
          "id": 3,
          "user": {
            "image": {
              "png": "../assets/profiles/mehri.jpg"
            },
            "username": "Mehri"
          },
          "content": "Love you",
          "sign": "../assets/signs/error 1.png"
        },
      ]
    })
   }
}
