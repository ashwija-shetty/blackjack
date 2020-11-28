import React, { Component, useState, useEffect } from "react";
import Status from "./Status";
import Controls from "./Controls";
import Hand from "./Hand";
import axios from "axios";

function Game(props) {
  //declare game state
  const GameState = {
    bet: 0,
    init: 1,
    userTurn: 2,
    dealerTurn: 3,
  };

  //declare cards drawn
  const Deal = {
    user: 0,
    dealer: 1,
    hidden: 2,
  };

  //declare messages
  const Message = {
    bet: "Place a Bet!",
    hitStand: "Hit or Stand?",
    bust: "You're Busted!",
    userWin: "You Win!",
    dealerWin: "Dealer Wins!",
    tie: "Its a Tie!",
  };

  const [betResponse, setBetResponse] = useState({});

  const suits = ["spades", "diamonds", "clubs", "hearts"];
  const [deck, setDeck] = useState(suits);

  const [userCards, setUserCards] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);

  const [bet, setBet] = useState(0);

  const [gameState, setGameState] = useState(GameState.bet);
  console.log(gameState);
  const [message, setMessage] = useState(Message.bet);
  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true,
  });

  //const [balance, setBalance] = useState(100);
  const balanceAmount = props.values.balanceAmount;
  console.log(balanceAmount);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    setBalance(props.values.balanceAmount);
  }, [balanceAmount]);

  useEffect(() => {
    if (gameState === GameState.init) {
      console.log(betResponse);
      if (
        betResponse.playerHand.length > 0 &&
        betResponse.dealerVisible.length > 0
      ) {
        betResponse.playerHand.forEach(function (playercard, index) {
          drawCard(Deal.user, betResponse.playerHand[index]);
        });

        drawCard(Deal.hidden, betResponse.dealerHidden);
        betResponse.dealerVisible.forEach(function (dealercard, index) {
          drawCard(Deal.dealer, betResponse.dealerVisible[index]);
        });
      }

      setGameState(GameState.userTurn);
      setMessage(Message.hitStand);
    }
  }, [gameState]);

  useEffect(() => {
    setUserScore(betResponse.playerValue);
    setUserCount(userCount + 1);
  }, [userCards]);

  useEffect(() => {
    setDealerScore(betResponse.dealerValue);
    setDealerCount(dealerCount + 1);
  }, [dealerCards]);

  useEffect(() => {
    if (gameState === GameState.userTurn) {
      if (betResponse.state === "Win") {
        buttonState.hitDisabled = true;
        buttonState.standDisabled = true;
        buttonState.resetDisabled = false;
        revealCard();
        setMessage(Message.userWin);
        setButtonState({ ...buttonState });
      } else if (betResponse.state === "Bust") {
        bust();
      }
    }
  }, [userCount]);

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      console.log("inside dealer turn" + betResponse);
      if (betResponse.state === "Win") {
        setMessage(Message.userWin);
      } else if (betResponse.state === "Tie") {
        setMessage(Message.tie);
      } else if (betResponse.state === "Lost") {
        setMessage(Message.dealerWin);
      }
    }
  }, [dealerCount]);

  const resetGame = () => {
    console.clear();
    setDeck(suits);

    setUserCards([]);
    setUserScore(0);
    setUserCount(0);

    setDealerCards([]);
    setDealerScore(0);
    setDealerCount(0);

    setBet(0);

    setGameState(GameState.bet);
    setMessage(Message.bet);
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true,
    });
  };

  const placeBet = (amount) => {
    setBet(amount);

    axios
      .get(
        `http://blackjack.us-e2.cloudhub.io/api/bet?uid=${props.values.name}&betAmount=${amount}`
      )
      .then((res) => {
        setBetResponse({ ...res.data });
        setBalance(res.data.balance);
        setGameState(GameState.init);
      });
  };

  const drawCard = (dealType, card) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const suit = deck[randomIndex];
      console.log(dealType, card);

      switch (suit) {
        case "spades":
          dealCard(dealType, card, "♠");
          break;
        case "diamonds":
          dealCard(dealType, card, "♦");
          break;
        case "clubs":
          dealCard(dealType, card, "♣");
          break;
        case "hearts":
          dealCard(dealType, card, "♥");
          break;
        default:
          break;
      }
    } else {
      alert("All cards have been drawn");
    }
  };

  const dealCard = (dealType, value, suit) => {
    console.log(dealType, value, suit);
    switch (dealType) {
      case Deal.user:
        userCards.push({ value: value, suit: suit, hidden: false });
        setUserCards([...userCards]);
        console.log(userCards);
        break;
      case Deal.dealer:
        dealerCards.push({ value: value, suit: suit, hidden: false });
        setDealerCards([...dealerCards]);
        console.log(dealerCards);
        break;
      case Deal.hidden:
        dealerCards.push({ value: value, suit: suit, hidden: true });
        setDealerCards([...dealerCards]);
        console.log(dealerCards);
        break;
      default:
        break;
    }
    //console.log(userCards, dealerCards);
  };

  const revealCard = () => {
    dealerCards.filter((card) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  const hit = () => {
    //drawCard(Deal.user);

    //userCards.length = 0;
    //setUserCards([...userCards]);
    axios
      .get(
        `http://blackjack.us-e2.cloudhub.io/api/hit?uid=${props.values.name}`
      )
      .then((res) => {
        console.log(res.data);
        //betResponse.playerHand = res.data.playerHand;
        betResponse.playerValue = res.data.playerValue;
        betResponse.state = res.data.state;
        console.log(betResponse);
        if (res.data.playerHand.length > 0) {
          //betResponse.playerHand.forEach(function (playercard, index) {
          //console.log(playercard);
          drawCard(
            Deal.user,
            res.data.playerHand[res.data.playerHand.length - 1]
          );
          //});
        }
        setBetResponse({ ...betResponse });
      });
    console.log("printing before axios");
  };

  const stand = () => {
    dealerCards.length = 0;
    setDealerCards([...dealerCards]);
    axios
      .get(
        `http://blackjack.us-e2.cloudhub.io/api/stand?uid=${props.values.name}`
      )
      .then((res) => {
        console.log(res.data);
        betResponse.dealerVisible = res.data.dealerVisible;
        betResponse.dealerValue = res.data.dealerValue;
        betResponse.state = res.data.state;
        setBetResponse({ ...betResponse });
        setBalance(res.data.balance);
        console.log(betResponse);
        buttonState.hitDisabled = true;
        buttonState.standDisabled = true;
        buttonState.resetDisabled = false;
        setButtonState({ ...buttonState });
        setGameState(GameState.dealerTurn);
        if (betResponse.dealerVisible.length > 0) {
          betResponse.dealerVisible.forEach(function (dealercard, index) {
            console.log(dealercard);
            drawCard(Deal.dealer, betResponse.dealerVisible[index]);
          });
        }
      });
  };

  const bust = () => {
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    setMessage(Message.bust);
  };

  return (
    <>
      <Status
        message={message}
        balance={balance}
        playerName={props.values.name}
      />
      <Controls
        balance={balance}
        gameState={gameState}
        buttonState={buttonState}
        betEvent={placeBet}
        hitEvent={hit}
        standEvent={stand}
        resetEvent={resetGame}
      />
      <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
      <Hand title={`Your Hand (${userScore})`} cards={userCards} />
    </>
  );
}

export default Game;
