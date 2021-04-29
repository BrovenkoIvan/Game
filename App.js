import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "./src/components/Button";

const App = () => {
  const [playerCounter, setPlayerCounter] = useState(0);
  const [computerCounter, setComputerCounter] = useState(0);
  const [actionDisabled, setActionDisabled] = useState(false);
  const count = useRef(25);

  useEffect(() => {
    if (count.current === 0) {
      showAlert();
    }
  }, [count.current]);

  const showAlert = useCallback(() => {
    const message = playerCounter % 2 == 0 ? "You win" : "You lose";
    Alert.alert(message, "Play Again?", [
      {
        text: "Ok",
        onPress: () => {
          nextGame();
        },
      },
    ]);
  });

  const nextGame = useCallback(() => {
    count.current = 25;
    setPlayerCounter(0);
    setComputerCounter(0);
    setActionDisabled(false);
  });

  const user = useCallback((n) => {
    if (n <= count.current) {
      count.current -= n;
      setPlayerCounter(playerCounter + n);
      setActionDisabled(true);
      if (count.current != 0) {
        computer();
      }
    }
  });

  const computer = useCallback(() => {
    let number = randomInteger();
    setTimeout(() => {
      count.current -= number;
      setComputerCounter(computerCounter + number);
      setActionDisabled(false);
    }, 1000);
  });

  const randomInteger = useCallback(() => {
    let min = 1;
    let max = 3;
    if (count.current === 2) {
      max = 2;
    } else if (count.current === 1) {
      max = 1;
    }
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  });

  const candlsList = useCallback(() =>
    new Array(count.current).fill("📍").map((item, index) => (
      <Text key={index} style={{ fontSize: 30 }}>
        {item}
      </Text>
    ))
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={styles.amount}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>
          {count.current}
        </Text>
      </View>
      <View style={styles.candles}>
        <View style={styles.allCandle}>{candlsList()}</View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
            Computer
          </Text>
          <Text style={{ fontSize: 30 }}>{computerCounter}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
            You
          </Text>
          <Text style={{ fontSize: 30 }}>{playerCounter}</Text>
        </View>
      </View>
      <View style={styles.allButton}>
        <Button number={1} actionDisabled={actionDisabled} user={user} />
        <Button number={2} actionDisabled={actionDisabled} user={user} />
        <Button number={3} actionDisabled={actionDisabled} user={user} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  candles: {
    alignItems: "center",
  },
  amount: {
    alignItems: "center",
  },
  allCandle: {
    flexWrap: "wrap",
    width: 330,
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
  },
  allButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
