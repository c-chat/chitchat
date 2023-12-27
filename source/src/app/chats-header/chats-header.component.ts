import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chats-header',
  templateUrl: './chats-header.component.html',
  styleUrls: ['./chats-header.component.scss']
})
export class ChatsHeaderComponent {


  @Input() placeholder: string = "Search";
  @Output() searchChanged = new EventEmitter<string>();
  searchText: string = '';
  isSearchVisible: boolean = false;
  constructor(public chatService: ChatService){}

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      // Clear search text
      this.searchText = '';
      this.chatService.resetFilters();
    }
  }

  filterChats() {
    this.searchChanged.emit(this.searchText);
  }

}