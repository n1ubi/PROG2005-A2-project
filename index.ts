// Product Item Interface
class Item {
    itemId: number;
    itemName: string;
    category: string;
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: string;
    popularItem: string;
    comment?: string;

    constructor(
        itemId: number,
        itemName: string,
        category: string,
        quantity: number,
        price: number,
        supplierName: string,
        popularItem: string,
        comment?: string
    ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.supplierName = supplierName;
        this.popularItem = popularItem;
        this.stockStatus = quantity > 0 ? "In Stock" : "Out of Stock";
        this.comment = comment || "No comment";
    }
}

// Initial product data
let items: Item[] = [
    new Item(1, "Dress", " Clothing", 10, 999, "LV", "Yes"),
    new Item(2, "Mouse", "Electronics", 0, 25, "Lenovo", "No"),
    new Item(3, "Wardrobe", "Furniture,", 15, 50, "John", "Yes")
];

// Display message on the page
function showMessage(message: string): void {
    const area = document.getElementById("itemDisplayArea");
    area.innerHTML = message;

     window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Display all products
function showAllItems(): void {
    if (items.length === 0) {
        showMessage("No items in inventory.");
        return;
    }

    let output = "=== ALL ITEMS ===\n";
    items.forEach(item => {
        output += `
ID: ${item.itemId} | Name: ${item.itemName} | Category: ${item.category}
Quantity: ${item.quantity} | Price: $${item.price} | Supplier: ${item.supplierName}
Stock: ${item.stockStatus} | Popular: ${item.popularItem} | Comment: ${item.comment}
----------------------------------------
`;
    });
    showMessage(output);
}

// Display popular products
function showPopularItems(): void {
    const popular = items.filter(i => i.popularItem.toLowerCase() === "yes");
    if (popular.length === 0) {
        showMessage("No popular items.");
        return;
    }

    let output = "=== POPULAR ITEMS ===\n";
    popular.forEach(item => {
        output += `${item.itemId} - ${item.itemName} | $${item.price} | ${item.stockStatus}\n`;
    });
    showMessage(output);
}

// Add new product
function addNewItem(): void {
    const name = (document.getElementById("addName") as HTMLInputElement).value.trim();
    const category = (document.getElementById("addCategory") as HTMLInputElement).value.trim();
    const qty = parseInt((document.getElementById("addQuantity") as HTMLInputElement).value);
    const price = parseFloat((document.getElementById("addPrice") as HTMLInputElement).value);
    const supplier = (document.getElementById("addSupplier") as HTMLInputElement).value.trim();
    const popular = (document.getElementById("addPopular") as HTMLInputElement).value.trim();
    const comment = (document.getElementById("addComment") as HTMLInputElement).value.trim();

    // Required field validation
    if (!name || !category || isNaN(qty) || isNaN(price) || !supplier || !popular) {
        showMessage("❌ All fields marked * are required!");
        return;
    }

    // Generate a unique ID
    const newId = items.length > 0 ? Math.max(...items.map(i => i.itemId)) + 1 : 1;

    // Create a product
    const newItem = new Item(newId, name, category, qty, price, supplier, popular, comment);
    items.push(newItem);

    // Clear the input field
    (document.getElementById("addName") as HTMLInputElement).value = "";
    (document.getElementById("addCategory") as HTMLInputElement).value = "";
    (document.getElementById("addQuantity") as HTMLInputElement).value = "";
    (document.getElementById("addPrice") as HTMLInputElement).value = "";
    (document.getElementById("addSupplier") as HTMLInputElement).value = "";
    (document.getElementById("addPopular") as HTMLInputElement).value = "";
    (document.getElementById("addComment") as HTMLInputElement).value = "";

    showMessage(`✅ Item added successfully!\nID: ${newId} | Name: ${name}`);
}

// Search for products by name
function searchItem(): void {
    const searchName = (document.getElementById("searchName") as HTMLInputElement).value.trim().toLowerCase();
    const found = items.filter(i => i.itemName.toLowerCase().includes(searchName));

    if (found.length === 0) {
        showMessage(`❌ No items found for: ${searchName}`);
        return;
    }

    let output = `=== SEARCH RESULTS (${found.length}) ===\n`;
    found.forEach(item => {
        output += `${item.itemId} - ${item.itemName} | ${item.category} | ${item.stockStatus}\n`;
    });
    showMessage(output);
}

// Update the product by name
function updateItem(): void {
    const targetName = (document.getElementById("updateName") as HTMLInputElement).value.trim().toLowerCase();
    const newCat = (document.getElementById("updateCategory") as HTMLInputElement).value.trim();
    const newQty = parseInt((document.getElementById("updateQuantity") as HTMLInputElement).value);
    const newPrice = parseFloat((document.getElementById("updatePrice") as HTMLInputElement).value);
    const newSupplier = (document.getElementById("updateSupplier") as HTMLInputElement).value.trim();

    const item = items.find(i => i.itemName.toLowerCase() === targetName);

    if (!item) {
        showMessage(`❌ Item not found: ${targetName}`);
        return;
    }

    // Update field
    if (newCat) item.category = newCat;
    if (!isNaN(newQty)) {
        item.quantity = newQty;
        item.stockStatus = newQty > 0 ? "In Stock" : "Out of Stock";
    }
    if (!isNaN(newPrice)) item.price = newPrice;
    if (newSupplier) item.supplierName = newSupplier;

    showMessage(`✅ Item updated: ${item.itemName}`);
}

// Delete product by name (with confirmation)
function deleteItem(): void {
    const targetName = (document.getElementById("deleteName") as HTMLInputElement).value.trim().toLowerCase();
    const index = items.findIndex(i => i.itemName.toLowerCase() === targetName);

    if (index === -1) {
        showMessage(`❌ Item not found: ${targetName}`);
        return;
    }

    // Delete
    const deleted = items.splice(index, 1);
    showMessage(`✅ Item deleted: ${deleted[0].itemName}`);
}