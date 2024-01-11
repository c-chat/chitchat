import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatsSubject = new BehaviorSubject<any>(null);
  chats$: Observable<any> = this.chatsSubject.asObservable();
  private originalChats: any;

  // search 
  searchText: string = '';

  constructor() {
    this.originalChats = {
      "currentUser": {
        "image": {
          "png": "../assets/profiles/profile.JPG"
        },
        "username": "Shahrzad"
      },
      "chats": [
        {
          "id": 1,
          "user": {
            "image": {
              "png": "../assets/profiles/profile.JPG"
            },
            "username": "Bardia"
          },
          "sign": "../assets/signs/Ellipse 3.png",
          "messages": [
            { "id": 1,
              "content": "Sure! What time?" 
            },
            { "id": 1, 
              "content": "How about 7 PM?" 
            }
          ]
        },
        {
          "id": 2,
          "user": {
            "image": {
              "png": "../assets/profiles/profile.JPG"
            },
            "username": "Ali"
          },
          "sign": "../assets/signs/tick 2.png",
          "messages": [
            { "id": 1,
              "content": "Great! Let's do it." 
            },
          ]
        },
        {
          "id": 3,
          "user": {
            "image": {
              "png": "../assets/profiles/profile.JPG"
            },
            "username": "Mehri"
          },
          "sign": "../assets/signs/error 1.png",
          "messages": [
            { "id": 1, 
              "content": "Great! Let's do it." 
            },
          ]
        },
        {
          "id": 4,
          "user": {
            "image": {
              "png": "../assets/profiles/profile.JPG"
            },
            "username": "Mehri"
          },
          "sign": "../assets/signs/error 1.png",
          "messages": [
            { "id": 1,
              "content": "Sure! What time?" 
            },
            { "id": 2, 
              "content": "How about 7 PM?" 
            }
          ]
        },
        {
          "id": 5,
          "user": {
            "image": {
              "png": "../assets/profiles/profile.JPG"
            },
            "username": "Mehri"
          },
          "sign": "../assets/signs/error 1.png",
          "messages": [
            { "id": 1,
              "content": "See you." 
            },
            { "id": 2, 
              "content": "I'll be there." 
            }
          ]
        },
      ]
    };
    this.chatsSubject.next(this.originalChats);
   }

   resetFilters() {
    this.chatsSubject.next(this.originalChats); 
  }

   filterChats(text: string) {
    const searchText = text.toLowerCase().trim();
    const allChats = { ...this.originalChats };

    if (!searchText) {
      // Show all chats if search text is empty
      this.chatsSubject.next(allChats);
    } else {
      const filteredChats = allChats.chats.filter((chat: any) =>
        chat.user.username.toLowerCase().includes(searchText)
      );
      // Update chatsSubject with filtered chats
      this.chatsSubject.next({ ...allChats, chats: filteredChats });
    }
  }

  getChatById(chatId: number): Observable<any> {
    return new Observable((observer) => {
      const chat = this.originalChats.chats.find((c: any) => c.id === chatId);
      if (chat) {
        observer.next(chat);
      } else {
        observer.error('Chat not found');
      }
      observer.complete();
    });
  }
}
