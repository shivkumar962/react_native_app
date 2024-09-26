import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Login from '../screens/loginScreen';
import LogOut from '../screens/logOutScreen';
import Registration from '../screens/registrationScreen';
import User from '../screens/user/userScreen';
import Student from '../screens/student/stuentScreen';
import Staff from '../screens/staffScreen';
import Parent from '../screens/parentScreen';
import Class from '../screens/classScreen';
import Notification from '../screens/notificationScreen';
import Setting from '../screens/settingScreen';
import AddStudent from '../screens/student/addStudent';
import CustomDrawerContent from '../screens/user/sideBaarUser'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function AppWraper() {
  const reduxUserData = useSelector((state) => state.userSlice);
  
  return (reduxUserData.user?.status ? <SideBaar /> : <StackScreen />);
}



function SideBaar() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={"User"} component={User} />
      <Drawer.Screen name={"Student"} component={StudentStackScreen} />
      <Drawer.Screen name={"Staff"} component={Staff} />
      <Drawer.Screen name={"Parent"} component={Parent} />
      <Drawer.Screen name={"Class"} component={Class} />
      <Drawer.Screen name={"Notifications"} component={Notification} />
      <Drawer.Screen name={"Setting"} component={Setting} />
      <Drawer.Screen name={"LogOut"} component={LogOut} />
    </Drawer.Navigator>
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function StudentStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Student" component={Student} options={{ headerShown: false }}/>
      <Stack.Screen name="AddStudent" component={AddStudent} />
    </Stack.Navigator>
  );
}


