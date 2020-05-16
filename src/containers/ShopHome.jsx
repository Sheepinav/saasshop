import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import AdminUI from "../components/Admin/AdminUI";
import UserUI from "../components/User/UserUI";
import "./ShopHome.css";
import firebase from "../firebase/firebase";

class ShopHome extends Component {
  state = {
    data: {},
    currentCart: {},
    orders: {},
  };

  componentDidMount() {
    this.pullShopItems();
    this.pullPastOrders();
  }

  pullShopItems = () => {
    firebase
      .firestore()
      .collection("inventory")
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          const data = this.state.data;
          data[item.id] = item.data();
          this.setState({ data });
        });
      });
  };

  // Function to get past orders
  pullPastOrders = () => {
    firebase
      .firestore()
      .collection("orders")
      .get()
      .then((snapshot) => {
        snapshot.forEach((order) => {
          const orders = this.state.orders;
          orders[order.id] = order.data();
          this.setState({ orders });
        });
      });
  };

  // Function to update the quantity of an item in cart
  onChange = (itemId, direction) => {
    const cart = this.state.currentCart;
    const currentCart = cart[itemId] ? cart[itemId] : 0;
    const stock = this.state.data[itemId].stock;
    let updatedCount =
      currentCart + direction < 0 ? 0 : currentCart + direction;
    if (updatedCount > stock) {
      updatedCount = stock;
      alert("Cannot add item to cart. Max stock of item reached.");
    }
    cart[itemId] = updatedCount;
    this.setState({ cart });
  };

  // Function to calculate the total number of items in cart
  calculateNumItems = (currentCart, items) => {
    let total = 0;

    Object.keys(items).forEach((key) => {
      total += currentCart[key] ? currentCart[key] : 0;
    });

    return total;
  };

  // Function to calculate total price of items in cart
  calculateTotalPrice = (currentCart, items) => {
    let total = 0;

    Object.keys(items).forEach((key) => {
      total +=
        items[key].sales_price * (currentCart[key] ? currentCart[key] : 0);
    });

    return total.toFixed(2);
  };

  // Function to update the quantity of an item in stock (admin only)
  // THIS DOESN'T FULLY WORK LOL
  updateStock = (itemId, direction) => {
    const data = this.state.data;
    const currentStock = this.state.data[itemId].stock;
    let updatedCount =
      currentStock + direction < 0 ? 0 : currentStock + direction;
    data[itemId].stock = updatedCount;
    //need to actually update firebase
    console.log(data[itemId].stock);
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          items={this.state.data}
          onChange={this.onChange}
          currentCart={this.state.currentCart}
          calculateTotalPrice={this.calculateTotalPrice}
          calculateNumItems={this.calculateNumItems}
        />
        <div className="gradient-divide"></div>
        <Route
          exact
          path="/"
          render={() => (
            <Shop
              items={this.state.data}
              onChange={this.onChange}
              currentCart={this.state.currentCart}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              {...props}
              items={this.state.data}
              currentCart={this.state.currentCart}
              onChange={this.onChange}
              calculateTotalPrice={this.calculateTotalPrice}
              calculateNumItems={this.calculateNumItems}
            />
          )}
        />

        <Route
          path="/user"
          render={(props) => (
            <UserUI
              {...props}
              items={this.state.data}
              orders={this.state.orders}
            />
          )}
        />
        <Route
          path="/admin"
          render={(props) => (
            <AdminUI
              {...props}
              items={this.state.data}
              updateStock={this.updateStock}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ShopHome;
