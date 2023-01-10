const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const query = {
      // give the query a unique name
      name: "store-product",
      text: `INSERT INTO products (title, price, description, "imageUrl") VALUES ($1, $2, $3, $4)`,
      values: [this.title, this.price, this.description, this.imageUrl],
    };

    return db.query(query);
  }

  static delete(productId) {}

  static fetchAll() {
    return db.query("SELECT * FROM products");
  }

  static findById(id) {
    const query = {
      // give the query a unique name
      name: "fetch-product",
      text: "SELECT * FROM products WHERE id = $1",
      values: [id],
    };

    // return db.query(`SELECT * FROM products WHERE id = ${id}`)
    return db.query(query);
  }
};
