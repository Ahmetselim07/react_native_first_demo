import { StyleSheet, Text, View } from "react-native";
import React,{useEffect} from "react";
import RootNavigation from "./src/navigation/RootNavigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { getAllData } from "./src/redux/dataSlice";
import { useDispatch,useSelector } from "react-redux";
import { Loading } from "./src/components";

const AppWrapper = () => {
  return (
     <Provider store={store}>
      <App/>
    </Provider>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const {isLoading,isSaved} = useSelector(state => state.data)
//const { isLoading } = useSelector((state) => state.data);

  useEffect(() => {
   dispatch(getAllData())
  }, [isSaved])
  
 if(isLoading) return <Loading/>
  return (
   <RootNavigation />
  );
};

export default AppWrapper;