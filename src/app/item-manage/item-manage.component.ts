// Assignment 2 Part 2 - Author: Qinglai Tian
import { Component } from '@angular/core';
import { ItemService } from '../inventory/item.service';
import { Item } from '../inventory/item.model';

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html',
  styleUrls: ['./item-manage.component.css']
})
export class ItemManageComponent {
  // Display area message
  message: string = '(No items yet)';

  // Add Product Form
  addName:string = '';
  addCategory: string = '';
  addQuantity = 0;
  addPrice = 0;
  addSupplier: string = '';
  addPopular: 'Yes' | 'No' = 'No';
  addComment: string = '';

  // Update product form
  updateName: string = '';
  updateCategory: string = '';
  updateQuantity = 0;
  updatePrice = 0;
  updateSupplier: string = '';

  // Delete product form
  deleteName: string = '';

  constructor(private itemService: ItemService) { }

  // Display message + Automatically return to top
  private showMessage(msg: string): void {
    this.message = msg;
    // Smoothly scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Show all products
  showAllItems(): void {
    const items = this.itemService.getItems();
    if (items.length === 0) {
      this.showMessage('No items in inventory.');
      return;
    }

    let output = '=== ALL ITEMS ===\n';
    items.forEach(item => {
      output += `
ID: ${item.itemId} | Name: ${item.itemName} | Category: ${item.category}
Quantity: ${item.quantity} | Price: $${item.price} | Supplier: ${item.supplierName}
Stock: ${item.stockStatus} | Popular: ${item.popularItem} | Comment: ${item.comment}
----------------------------------------
`;
    });
    this.showMessage(output);
  }

  // Display popular products
  showPopularItems(): void {
    const popular = this.itemService.getPopularItems();
    if (popular.length === 0) {
      this.showMessage('No popular items.');
      return;
    }

    let output = '=== POPULAR ITEMS ===\n';
    popular.forEach(item => {
      output += `${item.itemId} - ${item.itemName} | $${item.price} | ${item.stockStatus}\n`;
    });
    this.showMessage(output);
  }

  // Add new product
  addNewItem(): void {
    // Data verification
    if (!this.addName || !this.addCategory || this.addQuantity < 0 || this.addPrice < 0 || !this.addSupplier || !this.addPopular) {
      this.showMessage('❌ All fields marked * are required! Quantity/Price cannot be negative.');
      return;
    }

    // Add product
    const newItem = this.itemService.addItem({
      itemName: this.addName,
      category: this.addCategory,
      quantity: this.addQuantity,
      price: this.addPrice,
      supplierName: this.addSupplier,
      popularItem: this.addPopular,
      comment: this.addComment
    });

    // Clear the form
    this.addName = '';
    this.addCategory = '';
    this.addQuantity = 0;
    this.addPrice = 0;
    this.addSupplier = '';
    this.addPopular = 'No';
    this.addComment = '';

    this.showMessage(`✅ Item added successfully!\nID: ${newItem.itemId} | Name: ${newItem.itemName}`);
  }

  // Update the product
  updateItem(): void {
    if (!this.updateName) {
      this.showMessage('❌ Item name is required!');
      return;
    }

    // Build the update object
    const updateData: Partial<Item> = {};
    if (this.updateCategory) updateData.category = this.updateCategory;
    if (this.updateQuantity >= 0) updateData.quantity = this.updateQuantity;
    if (this.updatePrice >= 0) updateData.price = this.updatePrice;
    if (this.updateSupplier) updateData.supplierName = this.updateSupplier;

    const success = this.itemService.updateByName(this.updateName, updateData);
    if (!success) {
      this.showMessage(`❌ Item not found: ${this.updateName}`);
      return;
    }

    this.showMessage(`✅ Item updated: ${this.updateName}`);

    // Clear the form
    this.updateName = '';
    this.updateCategory = '';
    this.updateQuantity = 0;
    this.updatePrice = 0;
    this.updateSupplier = '';
  }

  // Delete the product
  deleteItem(): void {
    if (!this.deleteName) {
      this.showMessage('❌ Item name is required!');
      return;
    }

    if (confirm(`Are you sure you want to delete "${this.deleteName}"?`)) {
      const success = this.itemService.deleteByName(this.deleteName);
      if (!success) {
        this.showMessage(`❌ Item not found: ${this.deleteName}`);
        return;
      }

      
      this.showMessage(`✅ Item deleted: ${this.deleteName}`);
      this.deleteName = '';
    }
  }
}
