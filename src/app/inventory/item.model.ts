export interface Item {
  itemId: number;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Out of Stock';
  popularItem: 'Yes' | 'No';
  comment?: string;
}
