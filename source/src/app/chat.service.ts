import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatsSubject = new BehaviorSubject<any>(null);
  chats$: Observable<any> = this.chatsSubject.asObservable();

  // search 
  searchText: string = '';

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
        {
          "id": 4,
          "user": {
            "image": {
              "png": "../assets/profiles/amin.jpg"
            },
            "username": "Mehri"
          },
          "content": "photo",
          "sign": "../assets/signs/error 1.png"
        },
        {
          "id": 5,
          "user": {
            "image": {
              "png": "../assets/profiles/raei.jpg"
            },
            "username": "Mehri"
          },
          "content": "Ok",
          "sign": "../assets/signs/error 1.png"
        },
      ]
    })
   }

   resetFilters() {
    this.searchText = '';
    // Trigger an update to show all chats
    this.chatsSubject.next(this.chatsSubject.value);
  }

   // Function to filter chats based on search text
   filterChats(text: string) {
    this.searchText = text.toLowerCase();
    const allChats = this.chatsSubject.value;
    if (!text.trim()) {
      // Show all chats if search text is empty
      this.chatsSubject.next(allChats);
    } else {
      // Filter chats by username
      const filteredChats = allChats?.chats.filter((chat: any) =>
        chat.user.username.toLowerCase().includes(this.searchText)
      );
      // Update chatsSubject with filtered chats
      this.chatsSubject.next({ ...allChats, chats: filteredChats });
    }
  }
}
