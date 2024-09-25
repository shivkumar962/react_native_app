import React from "react";
import axios from "axios";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
// import { BASE_URL,USER_SIGNUP } from '@env'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Loader from "../components/loader/loader";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Registration({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [responseData, setResponseData] = React.useState("");

  // const reduxData = useSelector((state) => state.counter.items);
  // const reduxData = useSelector((state) => state.userSlice.items);
  // const reduxDataName = reduxData.map((object) => object.name);
  // console.log("all reduxData===>", reduxData);

  const handleRegister = async (values) => {
    // console.log("Register pressed", values);

    try {
      setIsLoading(true);
      // const response = await axios.post(`${BASE_URL}${USER_SIGNUP}`, values);
      const response = await axios.post(`http://192.168.31.231:3000/user/signup`, values);
      setResponseData(response.data);
      setIsLoading(false);
      if (response.data.status) {

        navigation.navigate("Login");
      }
      console.log("Registration successful", response);
    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration", error.response?.data || error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader/>
        // <View style={[loaderStyles.container, loaderStyles.horizontal]}>
        //   <ActivityIndicator style={{ alignSelf: "center" }} size={80} color={"green"} />
        // </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Register</Text>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {responseData ? <Text>{responseData.message}</Text> : null}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.infoText}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login here</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
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
    backgroundColor: "#28a745",
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  loginLink: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 5,
    marginHorizontal: 5,
  },
});

const loaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
