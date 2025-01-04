import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Storage from "../services/storage";

const TransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalvisible] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] =
    useState(null);
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      const storedTransactions = (await Storage.get("transactions")) || [];
      setTransactions(storedTransactions);
    };

    loadTransactions();
  }, []);

  // Delete transactions
  const handleDeleteTransaction = async () => {
    // Delete All Transactions
    if (deleteAll) {
      try {
        await Storage.remove("transactions");
        setTransactions([]);
        setModalvisible(false);
        Alert.alert("Success", "All transactions deleted successfully");
      } catch (error) {
        Alert.alert("Error", "Failed to delete all transactions");
      }
    } else {
      try {
        const updatedTransactions = transactions.filter(
          (_, index) => index !== selectedTransactionIndex
        );
        await Storage.save("transactions", updatedTransactions);
        setTransactions(updatedTransactions);
        setModalvisible(false);
        Alert.alert("Success", "Transaction deleted successfully");
      } catch (error) {
        Alert.alert("Error", "Failed to delete transaction");
      }
    }
  };

  // Confirmation modal
  const openDeleteModal = (index = null, isDeleteAll = false) => {
    setSelectedTransactionIndex(index);
    setDeleteAll(isDeleteAll);
    setModalvisible(true);
  };

  // Render the transaction item
  const renderTransaction = ({ item, index }) => (
    <View
      style={[
        styles.transaction,
        item.type === "income" ? styles.income : styles.expense,
      ]}
    >
      <Text>{item.date}</Text>
      <Text>{item.description || "-"}</Text>
      <Text>${item.amount}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Transaction Form", {
              transaction: item,
              index,
            })
          }
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openDeleteModal(index)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Transactions List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Delete All Button */}
      <TouchableOpacity
        onPress={() => openDeleteModal(null, true)}
        style={[styles.button, styles.deleteAllButton]}
      >
        <Text style={styles.buttonText}>Delete All Transactions</Text>
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalvisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {deleteAll
                ? "Are you sure you want to delete all transactions?"
                : "Are you sure you want to delete this transaction?"}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalvisible(false)}
                color="#6c757d"
              />
              <Button
                title="Delete"
                onPress={handleDeleteTransaction}
                color="#dc3545"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  transaction: { padding: 10, marginBottom: 10, borderRadius: 5 },
  income: { backgroundColor: "#d4edda", borderColor: "#c3e6cb" },
  expense: { backgroundColor: "#f8d7da", borderColor: "#f5c6cb" },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  deleteAllButton: {
    backgroundColor: "#f0ad4e",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default TransactionsScreen;
