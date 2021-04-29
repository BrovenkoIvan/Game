import React from "react";
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";

const Button = ({number, actionDisabled, user}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => user(number)}
        style={styles.button}
        disabled={actionDisabled}
      >
        <Text style={{ fontSize: 20,fontWeight:'bold'}}>{number}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 55,
        borderRadius: 30,
      },
})
export default Button;
