import { Component } from '@angular/core';
import { ItemService } from '../inventory/item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  keyword = '';
  result: any[] = [];

  constructor(private service: ItemService) { }

  doSearch() {
    this.result = this.service.searchByName(this.keyword);
  }
}
