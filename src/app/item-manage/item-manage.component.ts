import { Component } from '@angular/core';
import { ItemService } from '../inventory/item.service';

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html',
  styleUrls: ['./item-manage.component.css']
})
export class ItemManageComponent {
  name = '';
  cat = '';
  qty = 0;
  price = 0;
  supplier = '';
  popular: 'Yes' | 'No' = 'No';
  msg = '';

  constructor(private service: ItemService) { }

  add() {
    const id = this.service.getItems().length + 1;
    const stock = this.qty > 0 ? 'In Stock' : 'Out of Stock';
    this.service.addItem({
      itemId: id, itemName: this.name, category: this.cat,
      quantity: this.qty, price: this.price, supplierName: this.supplier,
      stockStatus: stock, popularItem: this.popular
    });
    this.msg = 'Added: ' + this.name;
  }

  update() {
    this.service.updateByName(this.name, {
      category: this.cat, quantity: this.qty, price: this.price
    });
    this.msg = 'Updated: ' + this.name;
  }

  delete() {
    if (confirm('Delete ' + this.name + '?')) {
      this.service.deleteByName(this.name);
      this.msg = 'Deleted: ' + this.name;
    }
  }
}
