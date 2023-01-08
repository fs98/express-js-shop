const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

const getCartProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static fetchAll(cb) {
    getCartProductsFromFile(cb);
  }

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // If cart exists already then check for duplicates
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteCartProduct(productId, price) {
    getCartProductsFromFile((cart) => {
      const product = cart.products.find((product) => product.id === productId);

      if (product) {
        const updatedCartProducts = cart.products.filter(
          (product) => product.id !== productId
        );

        const updatedCartTotalPrice = cart.totalPrice - product.qty * price;

        const updatedCart = {
          products: updatedCartProducts,
          totalPrice:
            updatedCartProducts.length > 0 ? updatedCartTotalPrice : 0,
        };

        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      } else {
        console.log("Not in the list.");
      }
    });
  }
};
