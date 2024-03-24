import { reactLocalStorage } from "reactjs-localstorage";

const setCartInLocalStorageFromPorductDetails = (
  product,
  selectSize,
  selectColor
) => {
  const items = {
    price: product?.productPrice,
    salePrice: product?.salePrice,
    originalPrice: product?.price,
    discount: 0,
    _id: product?._id,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    category: product?.category,
    quantity: 1,
    productTitle: product?.name,
    sku: "",
    userSize: selectSize,
    userColor: selectColor,
    productColor: product.productColor,
    size: product.size,
    itemTotal: product?.salePrice,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: 1,
    totalUniqueItems: 1,
    cartTotal: product?.salePrice,
    _id: "",
  };

  const getCart = reactLocalStorage.getObject("shopping-cart", true);
  const cart = JSON.parse(getCart);

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id == product._id);

    if (isAvailableProduct) {
      /* isAvailableProduct.updatedDate = new Date().toString();
      isAvailableProduct.quantity += 1;
      cart.totalItems++;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart)); */
      const withoutAvaiableProduct = cart.items.filter(
        (it) => it._id != product._id
      );
      withoutAvaiableProduct.push(items);
      cart.items = withoutAvaiableProduct;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
      return true;
    } else {
      cart.items.push(items);
      cart.totalItems++;
      cart.totalUniqueItems++;
      cart.cartTotal = cart.cartTotal + product.salePrice;
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    }
  } else {
    cartProduct.items.push(items);
    reactLocalStorage.setObject("shopping-cart", JSON.stringify(cartProduct));
  }
  // localStorage.setItem("shopping-cart", JSON.stringify(cartProduct));
};

export default setCartInLocalStorageFromPorductDetails;
