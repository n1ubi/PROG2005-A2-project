// Assignment 2 Part 2 - Author: Qinglai Tian
import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    {
      itemId: 1,
      itemName: 'Dress',
      category: 'Clothing',
      quantity: 10,
      price: 999,
      supplierName: 'LV',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'Best seller'
    },
    {
      itemId: 2,
      itemName: 'Mouse',
      category: 'Electronics',
      quantity: 0,
      price: 25,
      supplierName: 'Lenovo',
      stockStatus: 'Out of Stock',
      popularItem: 'No'
    },
    {
      itemId: 3,
      itemName: 'Wardrobe',
      category: 'Furniture',
      quantity: 15,
      price: 50,
      supplierName: 'John',
      stockStatus: 'In Stock',
      popularItem: 'Yes'
    }
  ];

  // Obtain all the products
  getItems(): Item[] {
    return this.items;
  }

  // Add product (automatically generate unique ID + inventory status)
  addItem(item: Omit<Item, 'itemId' | 'stockStatus'>): Item {
    const newId = this.items.length > 0 ? Math.max(...this.items.map(i => i.itemId)) + 1 : 1;
    const stockStatus = item.quantity > 10 ? 'In Stock' : item.quantity > 0 ? 'Low Stock' : 'Out of Stock';
    const newItem: Item = {
      ...item,
      itemId: newId,
      stockStatus,
      comment: item.comment || 'No comment'
    };
    this.items.push(newItem);
    return newItem;
  }

  // Delete the product by name
  deleteByName(name: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(i => i.itemName.toLowerCase() !== name.toLowerCase());
    return this.items.length < initialLength;
  }

  // Update the product by name
  updateByName(name: string, updated: Partial<Item>): boolean {
    const item = this.items.find(i => i.itemName.toLowerCase() === name.toLowerCase());
    if (!item) return false;
    Object.assign(item, updated);
    // Automatically update inventory status
    item.stockStatus = item.quantity > 10 ? 'In Stock' : item.quantity > 0 ? 'Low Stock' : 'Out of Stock';
    return true;
  }

  // Search for products by name
  searchByName(name: string): Item[] {
    return this.items.filter(i => i.itemName.toLowerCase().includes(name.toLowerCase()));
  }

  // Obtain popular products
  getPopularItems(): Item[] {
    return this.items.filter(i => i.popularItem === 'Yes');
  }
}
