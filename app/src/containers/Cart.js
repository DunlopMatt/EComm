import { useCart } from "../hooks/useCart";
import React from "react";
const axios = require("axios");

const Item = ({ item, cookies, refresh }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:4000/cart/products/delete`,
        data: { itemId: item.id, cookies },
      });
      console.log(response);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="cart-item message">
      <h3 class="subtitle">{item.product.title}</h3>
      <div class="cart-right">
        <div>
          ${item.product.price} X {item.quantity} =
        </div>
        <div class="price is-size-4">${item.product.price * item.quantity}</div>
        <div class="remove">
          <form onSubmit={handleSubmit}>
            <input hidden value={item.id} name="itemId" />
            <button class="button is-danger">
              <span class="icon is-small">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const RenderedItems = ({ items, cookies, refresh }) => {
  return items.map((item) => (
    <Item item={item} key={item.id} cookies={cookies} refresh={refresh} />
  ));
};

export const Cart = () => {
  const { items, cookies, refresh } = useCart();
  console.log(items);

  const totalPrice = items.reduce((prev, item) => {
    return prev + item.quantity * item.product.price;
  }, 0);

  return (
    <>
      <section>
        <div id="cart" className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-four-fifths">
              <h3 className="subtitle">
                <b>Shopping Cart</b>
              </h3>
              <div>
                <RenderedItems
                  items={items}
                  cookies={cookies}
                  refresh={refresh}
                />
              </div>
              <div className="total message is-info">
                <div className="message-header">Total</div>
                <h1 className="title">${totalPrice}</h1>
                <button className="button is-primary">Buy</button>
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </section>
    </>
  );
};
