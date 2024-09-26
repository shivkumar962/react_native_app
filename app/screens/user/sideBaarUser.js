import { useSelector } from "react-redux";
import {  DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";



export default function CustomDrawerContent(props) {
    const reduxUserData = useSelector((state) => state.userSlice.user.user);

    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: reduxUserData?.profileImage || 'https://randomuser.me/api/portraits/men/41.jpg' }} // Replace with the actual profile image URL
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{reduxUserData?.firstName || 'First Name'}</Text>
          <Text style={styles.userName}>{reduxUserData?.lastName || 'Last Name'}</Text>
          <Text style={styles.userEmail}>{reduxUserData?.phone || 'Phone'}</Text>
          <Text style={styles.userEmail}>{reduxUserData?.email || 'user@example.com'}</Text>
          <Text style={styles.userEmail}>{reduxUserData?.role || 'Role'}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }


const styles = StyleSheet.create({
    profileContainer: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 14,
      color: '#777',
    },
  });
  