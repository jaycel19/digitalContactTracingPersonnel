import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

const CustomTextInput = ({ placeholder, type, value, setValue }) => {
  return (
    <SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={newValue => setValue(newValue)}
          value={value}
          placeholder={placeholder}
          keyboardType={type}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: "blue",
    padding: 10
  },
  inputContainer:{
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center'
  }
});

export default CustomTextInput;