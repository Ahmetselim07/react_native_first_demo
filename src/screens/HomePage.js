import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoc,
  doc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  setUserInput,
  addItem,
  removeItem,
  setData,
  getAllData,
} from "../redux/dataSlice";
import { logout } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native"; // React Navigation

const HomePage = () => {
  const { data, userInput } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Navigation kullanımı

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todoList"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setData(fetchedData)); // Redux store'u güncelle
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddTask = async () => {
    if (!userInput.trim()) return;
    try {
      const docRef = await addDoc(collection(db, "todoList"), {
        title: userInput,
        content: "New task content",
      });
      const newTask = { id: docRef.id, title: userInput, content: "Merhaba" };
      dispatch(getAllData()); // Redux store'a ekle
      dispatch(setUserInput(""));
    } catch (error) {
      console.error("Error adding document:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todoList", id)); // Firestore'dan sil
      dispatch(removeItem(id)); // Redux store'dan sil
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // Logout işlemi
      navigation.replace("Login"); // Login sayfasına yönlendirme
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.rowFront}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TODO LIST</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#999"
          value={userInput}
          onChangeText={(text) => dispatch(setUserInput(text))}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <SwipeListView
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe={true}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#005BBB",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#005BBB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  rowFront: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#FF5A5F",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    borderRadius: 10,
    paddingRight: 20,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#FF5A5F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
