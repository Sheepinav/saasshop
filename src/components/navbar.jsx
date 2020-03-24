import React, { Component } from "react";
import Logo from "../assets/images/logo.png";

class NavBar extends Component {
  sumArray = (items, prop) => {
    if (items == null) {
      return 0;
    }
    return items.reduce(function(a, b) {
      return b[prop] == null ? a : a + b[prop];
    }, 0);
  };

  calculateTotal = () => {
    var total = 0;
    for (var i = 0; i < this.props.items.length; i++) {
      total = total + this.props.items[i].price * this.props.items[i].value;
    }
    return total;
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img style={{ width: 100 }} src={Logo} />
          <span>Items {this.sumArray(this.props.items, "value")}</span>
          <span>Subtotal {this.calculateTotal()}</span>
        </a>
      </nav>
    );
  }
}

export default NavBar;
