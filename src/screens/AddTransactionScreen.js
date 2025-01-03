import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Storage from "../services/storage";

const AddTransactionScreen = ({ navigation }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Invalid amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
      date: new Date().toLocaleDateString(),
    };

    try {
      const existingTransactions = (await Storage.get("transactions")) || [];
      const updatedTransactions = [...existingTransactions, newTransaction];
      await Storage.set("transactions", updatedTransactions);
      Alert.alert("Success", "Transaction added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add transaction");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction Type:</Text>
      <View style={styles.typeSwitch}>
        <Button
          title="Income"
          onPress={() => setType("income")}
          color={type === "income" ? "green" : "gray"}
        />
        <Button
          title="Expense"
          onPress={() => setType("expense")}
          color={type === "expense" ? "red" : "gray"}
        />

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Description (Optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        <Button title="Save Transaction" onPress={handleSave} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  typeSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default AddTransactionScreen;
