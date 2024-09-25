import 'react-native-gesture-handler'
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  useSelector } from "react-redux";


import Login from '../screens/loginScreen'
import LogOut from '../screens/logOutScreen'
import Registration from '../screens/registrationScreen'
import User from '../screens/userScreen'
import Student from '../screens/student/stuentScreen'
import Staff from '../screens/staffScreen'
import Parent from '../screens/parentScreen'
import Class from '../screens/classScreen'
import Notification from '../screens/notificationScreen'
import Setting from '../screens/settingScreen'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


export default function AppWraper() {
  // const reduxCartData = useSelector((state) => state.counter.items);
  // const reduxDataName = reduxCartData.map((object) => object.name);
const reduxUserData = useSelector((state) => state.userSlice);
// console.log("all reduxCartData app===>", reduxDataName);
// console.log("all reduxUserData app===>", reduxUserData.user);

if(!reduxUserData.user?.status){
  return  <StackScreen />
}

if(reduxUserData.user?.status){
  return  <SideBaar/>
}

}


 

function SideBaar() {

  return (  //  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name={"User"} component={User} />
      <Drawer.Screen name={"Student"} component={Student} />
      <Drawer.Screen name={"Staff"} component={Staff} />
      <Drawer.Screen name={"Parent"} component={Parent} />
      <Drawer.Screen name={"Class"} component={Class} />
      <Drawer.Screen name={"Notifications"} component={Notification} />
      <Drawer.Screen name={"Setting"} component={Setting} />
      <Drawer.Screen name={"LogOut"} component={LogOut} />
    </Drawer.Navigator>
    //  </NavigationContainer>
  )
}

function StackScreen() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

