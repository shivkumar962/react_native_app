import { Provider } from "react-redux";
import { store, persistor } from "../components/redux/store";
import { PersistGate } from 'redux-persist/integration/react'

import AppWraper from './AppWraper'
import { View, Text } from "react-native";



export default function App() {


  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      <AppWraper/>

      </PersistGate>
    </Provider>
   
  );
}


