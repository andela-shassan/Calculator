/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use-strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalcButton from './app/components/CalcButton';

const buttons = [
  ['CLR','DEL'],
  [7,8,9,'/'],
  [4,5,6,'*'],
  [1,2,3,'-'],
  [0,'.','=','+']
];

const topMargin = Platform.select({
  ios: 18,
  android: 0,
});

const displayPadding = Platform.select({
  ios: 10,
  android: 5,
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      inputValue: 0,
      previousInputValue: 0,
      selectedSymbol: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{this.state.inputValue} </Text>
        </View>
        <View style={styles.keypadsContainer}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }

  renderButtons() {
    let views = [];

    const len = buttons.length;
    for (var i = 0; i < len; i++) {
      let row = buttons[i];

      let le = row.length;
      let inputRow = [];
      for (var j = 0; j < le; j++) {
        let input = row[j];
        inputRow.push(
          <CalcButton value={input} key={i + '_' + j}
            onPress={this.onButtonPressed.bind(this, input)}
              highlight={this.shouldHighlight(input) ? true : false}
           />
        );
      }
      views.push(
        <View style={styles.inputRow} key={'row_' + i}>
          {inputRow}
        </View>
      );
    }
    return views;
  }

  onButtonPressed(input) {
    switch(typeof input) {
      case 'number':
        return this.handleNumberInput(input);
      case 'string':
        return this.handleStringInput(input);
    }
  }

  shouldHighlight(input) {
    return input === this.state.selectedSymbol;
  }

  handleNumberInput(number) {
    var val;
    if (this.state.inputValue === 0) {
      val = number;
    } else {
      let num = number + "";
      let stateValue = this.state.inputValue + ""
      val = stateValue.concat(num);
    }
    this.setState({
      inputValue: +val
    });
  }

  handleStringInput(symbol) {
    switch (symbol) {
      case '/':
      case '*':
      case '+':
      case '-':
          if (this.state.selectedSymbol !== null) {
            this.setState({
              selectedSymbol: symbol,
            });
          } else {
            this.setState({
              selectedSymbol: symbol,
              previousInputValue: this.state.inputValue,
              inputValue: 0,
            });
          }
        break;
      case '=':
        this.setState({
          previousInputValue: 0,
          inputValue: eval(this.state.previousInputValue + this.state.selectedSymbol + this.state.inputValue),
          selectedSymbol: null
        });
        break;
      case 'CLR':
        this.resetState();
        break;
      case 'DEL':
        var currentInputValue = this.state.inputValue + "";
        let newString = currentInputValue.substring(0, currentInputValue.length - 1);
        this.setState({
          inputValue: +newString,
        });
        break;
      case '.':
        let currentInputValue = this.state.inputValue + "";
        if (currentInputValue.indexOf(".") === -1) {
          let value = currentInputValue.concat(symbol);
          this.setState({
            inputValue: value,
          });
        }
        break;
      default:

    }
  }

  resetState() {
    this.setState({
      inputValue: 0,
      previousInputValue: 0,
      selectedSymbol: null,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: topMargin,
  },
  displayContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#193441',
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 38,
    padding: displayPadding,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  keypadsContainer: {
    flex: 7,
    backgroundColor: '#3E606F',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },

});
