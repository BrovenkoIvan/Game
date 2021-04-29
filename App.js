import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const candle = <Text style={{fontSize: 26}}>📍</Text>;

const App = () => {
  const [playerCounter, setPlayerCounter] = useState(0);
  const [computerCounter, setComputerCounter] = useState(0);
  const [actionDisabled, setActionDisabled] = useState(false);
  const count = useRef(25);
  if (count.current === 0) {
    if (playerCounter % 2 == 0) {
      Alert.alert('You Win', 'Play Again?', [
        {
          text: 'Ok',
          onPress: () => {
            nextGame();
          },
        },
      ]);
    } else {
      Alert.alert('You Lose', 'Play Again?', [
        {
          text: 'Ok',
          onPress: () => {
            nextGame();
          },
        },
      ]);
    }
  }
  const nextGame = () => {
    count.current = 25;
    setPlayerCounter(0);
    setComputerCounter(0);
    setActionDisabled(false);
  };
  const getCandles = () => {
    const candles = [];
    for (let k = 0; k < count.current; k++) {
      candles.push(<View key={k}>{candle}</View>);
    }
    return candles;
  };

  const user = n => {
    if (n <= count.current) {
      count.current -= n;
      setPlayerCounter(playerCounter + n);
      setActionDisabled(true);
      if (count.current != 0) {
        computer();
      }
    }
  };

  const computer = () => {
    let number = randomInteger();
    setTimeout(() => {
      count.current -= number;
      setComputerCounter(computerCounter + number);
      setActionDisabled(false);
    }, 1000);
  };

  const randomInteger = () => {
    let min = 1;
    let max = 3;
    if (count.current === 2) {
      max = 2;
    } else if (count.current === 1) {
      max = 1;
    }
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };
  console.log(actionDisabled);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={styles.amount}>
        <Text style={{fontSize: 50}}>{count.current}</Text>
      </View>
      <View style={styles.candles}>
        <View style={styles.allCandle}>{getCandles()}</View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Computer</Text>
          <Text style={{ fontSize: 20}}>{computerCounter}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>You</Text>
          <Text style={{ fontSize: 20}}>{playerCounter}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => user(1)}
          style={styles.button}
          disabled={actionDisabled}>
          <Text style={{ fontSize: 20}}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => user(2)}
          style={styles.button}
          disabled={actionDisabled}>
          <Text style={{ fontSize: 20}}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => user(3)}
          style={styles.button}
          disabled={actionDisabled}>
          <Text style={{ fontSize: 20}}>3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  candles: {
    alignItems: 'center',
  },
  amount: {
    alignItems: 'center',
  },
  allCandle: {
    flexWrap: 'wrap',
    width: 330,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 55,
    borderRadius: 30
  },
});

export default App;
