import { reactLocalStorage } from "reactjs-localstorage";

const updateCartLocalStorage = ({ action, product }) => {
  const getCart = reactLocalStorage.getObject("shopping-cart", true);
  const cart = JSON.parse(getCart);

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id == product._id);
    if (action == "add") {
      isAvailableProduct.itemTotal += isAvailableProduct.salePrice;
      isAvailableProduct.quantity++;
      cart.totalItems++;
      cart.cartTotal += isAvailableProduct.salePrice;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    }
    if (action == "size") {
      isAvailableProduct.userSize = product.userSize;
      isAvailableProduct.userColor = product.userColor;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return;
    } else if (action == "minus") {
      isAvailableProduct.itemTotal -= isAvailableProduct.salePrice;
      isAvailableProduct.quantity--;
      cart.cartTotal -= isAvailableProduct.salePrice;
      if (isAvailableProduct.quantity < 1) {
        const result = cart.items.filter((it) => it._id != product._id);
        //remove localstrote code
        cart.items = result;
        cart.totalItems--;
        reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
        return;
      }
      cart.totalItems--;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    } else if (action === "delete") {
      const result = cart.items.filter((it) => it._id != product._id);
      //remove localstrote code
      cart.items = result;
      cart.totalItems -= isAvailableProduct.quantity;
      cart.cartTotal -=
        isAvailableProduct.quantity * isAvailableProduct.salePrice;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return;
    }
  }
};

export default updateCartLocalStorage;
