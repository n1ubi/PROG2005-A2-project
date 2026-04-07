// Assignment 2 Part 2 - Author: Qinglai Tian
import { Component } from '@angular/core';
import { ItemService } from '../inventory/item.service';
import { Item } from '../inventory/item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  keyword:string = '';
  result: Item[] = [];
  searched:boolean = false;

  constructor(private itemService: ItemService) { }

  doSearch(): void {
    this.searched = true;
    if (!this.keyword.trim()) {
      this.result = this.itemService.getItems();
    } else {
      this.result = this.itemService.searchByName(this.keyword);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showPopular(): void {
    this.result = this.itemService.getPopularItems();
    this.keyword = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
