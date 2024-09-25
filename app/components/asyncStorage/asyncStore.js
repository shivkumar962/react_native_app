// import AsyncStorage from '@react-native-async-storage/async-storage';




// export default function asyncStorage() {
//   const value = {
//     name: "Krishna ji",
//     address: "Vrandavan",
//   };
//   const user = {
//     name: "shiv",
//     address: "malviya",
//   };

//   const setDataStore = async () => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem("mykey", jsonValue);
//       console.log("setDataStore");
//     } catch (e) {
//       // saving error
//     }
//   };

//   const getDataStore = async () => {
//     try {
//       const getData = await AsyncStorage.getItem("mykey");
//       console.log("getDataStore", getData);
//     } catch (e) {
//       // saving error
//     }
//   };

//   const removeDataStore = async () => {
//     try {
//       await AsyncStorage.removeItem("mykey");
//       console.log("removeDataStore");
//     } catch (e) {
//       // saving error
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center" }}>
//       <Text>async storage</Text>
//       <Button title="Set data" onPress={setDataStore}></Button>
//       <Button title="Get data" onPress={getDataStore}></Button>
//       <Button title="Remove data" onPress={removeDataStore}></Button>
//     </View>
//   );
// }
