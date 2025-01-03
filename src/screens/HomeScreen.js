import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";
import Storage from "../services/storage";

const HomeScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const loadData = async () => {
      const transactions = (await Storage.get("transactions")) || [];
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

      setBalance(income - expense);
      setSummary({ income, expense });
    };

    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Total Balance: ${balance}</Text>
      <VictoryPie
        data={[
          { x: "Income", y: summary.income },
          { x: "Expense", y: summary.expense },
        ]}
        colorScale={["green", "red"]}
        style={{ labels: { fontSize: 14 } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  balanceText: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
