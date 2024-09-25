import React, { useEffect, useState } from "react";
import { addUser, removeUser,resetUser } from '../components/redux/userSlice'
import axios from "axios";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ActivityIndicator} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL,USER_LOGIN,STUDENTS, LOGIN_URL } from '@env';

import Loader from '../components/loader/loader'

import App from '../(tabs)/index' 

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState("");

  const dispatch = useDispatch();

//   const reduxCartData = useSelector((state) => state.counter.items);
//   const reduxDataName = reduxCartData.map((object) => object.name);
// const reduxUserData = useSelector((state) => state.userSlice.items);
// console.log("all reduxCartData===>", reduxDataName);
// console.log("all reduxUserData===>", reduxUserData);


  const handleLogin = async (values) => {
    console.log("Login pressed", values);
    try {
      setIsLoading(true);
      const response = await axios.post(`http://192.168.31.231:3000/user/login`,values);
      // const response = await axios.post(`${BASE_URL}${USER_LOGIN}`,values);
      setResponseData(response.data);
      setIsLoading(false);
      if (response.data.status) {
        dispatch(addUser(response.data))
      }
      console.log("Registration successful", response);

    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration",error.response?.data || error.message );
    }
 

  };
  console.log("Registration responseData", responseData.data);

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Login</Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
              
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                    <Text>{responseData.data?.message}</Text>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
