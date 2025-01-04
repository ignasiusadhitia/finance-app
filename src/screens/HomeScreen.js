import React, { useEffect, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import Storage from "../services/storage";
import { PieChart } from "react-native-chart-kit";

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

  const chartData = [
    {
      name: "Income",
      population: summary.income,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expense",
      population: summary.expense,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("Add Transaction")}
      />
      <Button
        title="View Transactions"
        onPress={() => navigation.navigate("Transactions")}
      />
      <Text style={styles.balanceText}>Total Balance: ${balance}</Text>

      {summary.income || summary.expense ? (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          padding={"16"}
          absolute
        />
      ) : (
        <Text>Loading chart...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  balanceText: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
