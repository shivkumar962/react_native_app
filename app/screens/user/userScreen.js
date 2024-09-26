import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function User() {
  const userData = {
    profilePic: "https://randomuser.me/api/portraits/men/41.jpg",
  };

  const userDetails = useSelector((item) => item.userSlice.user);
  // console.log("userDetails ===>", userDetails);

 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />

        {userDetails.user.firstName && <Text style={styles.name}>{userDetails?.user.firstName}</Text>}
        {userDetails.user.lastName && <Text style={styles.name}>{userDetails?.user.lastName}</Text>}
        {userDetails.user.email && <Text style={styles.email}>{userDetails?.user.email}</Text>}
        {userDetails.user.phone && <Text style={styles.phone}>{userDetails?.user.phone}</Text>}
        {userDetails.user.role && <Text style={styles.role}>{userDetails?.user.role}</Text>}
        {userDetails.user.address && <Text style={styles.address}>{userDetails?.user.address}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background for a calm feel
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#00bcd4', // Add a border for profile picture for a modern look
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
    fontStyle: 'italic', // Italic for softer text styles
  },
  phone: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  role: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4caf50', // Highlighted role with green color
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center', // Centered text for the address
    lineHeight: 22, // Increased line height for better readability
  },
});
