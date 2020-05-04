import React, { Component } from "react";
import CartItem from "./CartItem/CartItem.jsx";
import "./Cart.css";

class Cart extends Component {
  state = {};

  calculateTotal = (currentCart, items) => {
    var total = 0;

    Object.keys(items).forEach((key) => {
      total +=
        items[key].sales_price * (currentCart[key] ? currentCart[key] : 0);
    });

    return total.toFixed(2);
  };

  onSubmit = () => {
    alert("Pressed submit button");
  };

  render() {
    const { items, currentCart, onChange } = this.props;
    return (
      <React.Fragment>
        <h1>Your Shopping Cart</h1>
        <div className="cartContainer">
          <div className="cartSummary">
            {Object.keys(items).map((key) => (
              <CartItem
                key={key}
                itemId={key}
                quantity={currentCart[key]}
                item={items[key]}
                onChange={onChange}
              />
            ))}
          </div>
          <div className="paymentBox">
            <p style={{ textAlign: "right" }}>
              <strong>SUBTOTAL</strong> $
              {this.calculateTotal(currentCart, items)}
            </p>
            <form>
              <label for="name">Name</label>
              <input type="text" id="name" name="name"></input>
              <br></br>
              <label for="email">Email</label>
              <input type="text" id="email" name="email"></input>
              <br></br>
              <div className="paymentMethod">
                <label for="payment">Payment Method</label>
                <input
                  type="radio"
                  id="venmo"
                  name="payment"
                  value="venmo"
                ></input>
                <label for="venmo">Venmo</label>

                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                ></input>
                <label for="cash">Cash</label>

                <input
                  type="radio"
                  id="card"
                  name="payment"
                  value="card"
                ></input>
                <label for="card">Card</label>
                <br></br>
              </div>
              <label for="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber"></input>
              <br></br>
              <label for="cardName">Name on Card</label>
              <input type="text" id="cardName" name="cardName"></input>
              <br></br>
              <label for="expiration">Expiration Date</label>
              <input type="text" id="expiration" name="expiration"></input>
              <br></br>
              <p>
                If you selected Venmo, please Venmo $
                {this.calculateTotal(currentCart, items)} to @calsaas.
              </p>
              <input
                className="submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
              ></input>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
