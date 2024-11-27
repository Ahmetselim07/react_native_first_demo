import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {signOut, getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = user.stsTokenManager.accessToken;

      // Token ve kullanıcı bilgilerini saklayın
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "user/autoLogin",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const user = await AsyncStorage.getItem("userData");

      if (token && user) {
        return { token, user: JSON.parse(user) }; // Kullanıcı bilgilerini de döndür
      } else {
        throw new Error("User Not Found"); // Token veya kullanıcı bilgisi eksikse hata fırlat
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Kullanıcı cikis islemleri
export const logout = createAsyncThunk('user/logout',async() => {
  try{
    const auth = getAuth()
    await signOut(auth)
    await AsyncStorage.removeItem('userToken')
    return null;
  }catch(error){
    throw error
  }
})

// Kullanici kayit islemleri
export const register = createAsyncThunk('user/register',async({email,password}) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    const user = userCredential.user
    const token = user.stsTokenManager.accessToken;
    await sendEmailVerification();
    await AsyncStorage.setItem('userToken',token)
    return token;
  } catch (error) {
    throw error
  }
})

const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
         state.user = action.payload.user;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth=false
      })
      .addCase(register.fulfilled, (state,action) => {
        state.isLoading=false;
        state.isAuth=true
        state.token = action.payload
      })
       .addCase(register.rejected,(state,action) => {
        state.isLoading = false;
        state.isAuth = true
        state.error='Invalid Email or Password'
      })
  },
});


export const { setEmail, setIsLoading, setPassword } = userSlice.actions;
export default userSlice.reducer;
