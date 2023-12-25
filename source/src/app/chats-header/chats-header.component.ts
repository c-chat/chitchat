import { Component, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chats-header',
  templateUrl: './chats-header.component.html',
  styleUrls: ['./chats-header.component.scss']
})
export class ChatsHeaderComponent {


  @Input() placeholder: string = "Search"
  isSearchVisible: boolean = false;
  searchText: string = '';
  constructor(public chatService: ChatService){}

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      // Clear search text and reset filters when hiding search
      this.searchText = '';
      this.chatService.resetFilters();
    }
  }

  filterChats() {
    this.chatService.filterChats(this.searchText);
  }

}
