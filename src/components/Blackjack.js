import React, { Component } from "react";
import { Login } from "./Login";
import Game from "./Game";
import Header from "./Header";
import axios from "axios";

export class Blackjack extends Component {
  state = {
    step: 1,
    name: "",
    balanceAmount: "",
  };

  //proceed to game page
  nextStep = () => {
    const { step } = this.state;
    axios
      .get(
        "http://blackjack.us-e2.cloudhub.io/api/initialize?uid=" +
          this.state.name
      )
      .then((res) => {
        const persons = res.data;
        this.setState({ name: res.data.uid, balanceAmount: res.data.balance });
      });

    this.setState({ step: step + 1 });
  };

  //reset game and land on rules/login page
  prevStep = () => {
    const { step } = this.state;
    axios
      .get(
        "http://blackjack.us-e2.cloudhub.io/api/delete?uid=" + this.state.name
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ step: step - 1, name: "", balanceAmount: "" });
      });
  };

  //get the entered named and set it in state variable
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return (
          <div>
            <Header values={this.state} />
            <Login
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={this.state}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <Header prevStep={this.prevStep} values={this.state} />
            <Game values={this.state} />;
          </div>
        );
    }
  }
}

export default Blackjack;
