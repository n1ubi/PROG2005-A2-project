import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // Initialize product data
  private items: Item[] = [
    {
      itemId: 1,
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      price: 999,
      supplierName: 'TechSupplier',
      stockStatus: 'In Stock',
      popularItem: 'Yes'
    },
    {
      itemId: 2,
      itemName: 'Mouse',
      category: 'Electronics',
      quantity: 0,
      price: 25,
      supplierName: 'TechSupplier',
      stockStatus: 'Out of Stock',
      popularItem: 'No'
    }
  ];

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  updateByName(name: string, updated: Partial<Item>) {
    const item = this.items.find(i => i.itemName.toLowerCase() === name.toLowerCase());
    if (item) {
      Object.assign(item, updated);
      //Automatically update inventory status
      item.stockStatus = item.quantity > 0 ? 'In Stock' : 'Out of Stock';
    }
  }

  deleteByName(name: string) {
    this.items = this.items.filter(i => i.itemName.toLowerCase() !== name.toLowerCase());
  }

  searchByName(name: string) {
    return this.items.filter(i =>
      i.itemName.toLowerCase().includes(name.toLowerCase())
    );
  }

  getPopularItems() {
    return this.items.filter(i => i.popularItem === 'Yes');
  }
}
