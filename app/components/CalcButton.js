/* @flow */

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

export default class CalcButton extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, this.props.highlight ? styles.buttonHighlighted : null]}
        underlayColor="#193441"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#91AA9D',
  },
  buttonHighlighted: {
    backgroundColor: '#193441',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});
