import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const storedTransactions =
        JSON.parse(await AsyncStorage.getItem("transactions")) || [];
      setTransactions(storedTransactions);
    };
    loadTransactions();
  }, []);

  const renderTransaction = ({ item }) => (
    <View
      style={[
        styles.transaction,
        item.type === "income" ? styles.income : styles.expense,
      ]}
    >
      <Text>{item.date}</Text>
      <Text>{item.description || "-"}</Text>
      <Text>${item.amount}</Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  transaction: { padding: 10, marginBottom: 10, borderRadius: 5 },
  income: { backgroundColor: "#d4edda", borderColor: "#c3e6cb" },
  expense: { backgroundColor: "#f8d7da", borderColor: "#f5c6cb" },
});

export default TransactionsScreen;
