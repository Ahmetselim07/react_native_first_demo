import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
 
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const initialState = {
  data: [],
  userInput:null,
  isLoading: false,
  isSaved:false,
  error: null,
};

//Firebasede olan tüm verileri çekmeyi sağlar

export const getAllData = createAsyncThunk("data/getData", async () => {
    
  const allData = [];
  try {
    const querySnapshot = await getDocs(collection(db, "todoList"));
    querySnapshot.forEach((doc) => {
      //console.log('${doc.id} => ${doc.data()} ')
      allData.push({ ...doc.data(), id: doc.id });
    });
    return allData;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


 
  //Kullanicinin girdigi veriyi firebase databasee kaydeder.
  export const saveData = createAsyncThunk('data/saveData',async(value) => {
try {
  const docRef = await addDoc(collection(db, "todoList"), {
    
    content: value,
    
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
  throw error
}
  })

// const getData = async () => {
//   const allData = [];
  
// };


export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    addItem: (state, action) => {
      state.data.push(action.payload);
    },
    removeItem: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },

  

  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(saveData.pending,(state) => {
        state.isLoading=true
      })
      .addCase(saveData.fulfilled,(state,action) => {
        state.isLoading=false
        state.isSaved= !state.isSaved
      })
      .addCase(saveData.rejected,(state,action) => {
        state.isLoading=false
        state.error=action.payload
      })
  },
});
export const { setUserInput, addItem, removeItem, setData } = dataSlice.actions;
export default dataSlice.reducer;
