const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static delete(productId) {}

  static fetchAll() {
    return db.query("SELECT * FROM products");
  }

  static findById(id) {}
};
