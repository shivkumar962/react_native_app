import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";


// Form Validation Schema
const AddStudentSchema = Yup.object().shape({
  admissionNumber: Yup.string().required("Admission Number is required"),
  dob: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  enrollmentDate: Yup.date().required("Enrollment Date is required"),
});

export default function AddStudent() {

  const [apiResponse, setApiResponse] = useState("");
  const [apiResponseMessage, setApiResponseMessage] = useState("");
  setTimeout(() => {
    setApiResponseMessage("");
  }, 5000);
  const [dob, setDob] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);

  const [enrollmentDate, setEnrollmentDate] = useState(new Date());
  const [showEnrollmentDatePicker, setShowEnrollmentDatePicker] =
    useState(false);

  // Helper function to format date as "DD/MM/YYYY"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB"); // 'en-GB' formats as DD/MM/YYYY
  };

  const handleDobChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDobPicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const handleEnrollmentDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || enrollmentDate;
    setShowEnrollmentDatePicker(Platform.OS === "ios");
    setEnrollmentDate(currentDate);
  };

  const handleSubmit = async (values) => {
    console.log("form value===>", values);

    try {
      // API call
      const response = await axios.post("http://192.168.31.231:3000/students", {
        admissionNumber: values.admissionNumber,
        dob: formatDate(dob),
        gender: values.gender,
        enrollmentDate: formatDate(enrollmentDate),
      });
      console.log("API Response:", response.data);
      setApiResponse(response.data);
      setApiResponseMessage(response.data.message)
      if (response.data.status) {
        alert("Student added successfully!");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("There was an error adding the student.");
    }
  };

  console.log("apiResponse==>", apiResponse);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          admissionNumber: "",
          dob: "",
          gender: "",
          enrollmentDate: "",
        }}
        validationSchema={AddStudentSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Add Student</Text>

            {/* Admission Number */}
            <Text style={{marginLeft:2}} >Admission Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Admission Number"
              onChangeText={handleChange("admissionNumber")}
              onBlur={handleBlur("admissionNumber")}
              value={values.admissionNumber}
            />
            {errors.admissionNumber && (
              <Text style={styles.error}>{errors.admissionNumber}</Text>
            )}

            {/* Date of Birth */}
            <Text style={{marginLeft:2}} >Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDobPicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY" // Corrected placeholder
                value={formatDate(dob)} // Date formatted as "DD/MM/YYYY"
                editable={false}
              />
            </TouchableOpacity>
            {showDobPicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  handleDobChange(e, selectedDate);
                  setFieldValue("dob", selectedDate); // Formik field update
                }}
              />
            )}
            {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

            {/* Gender Dropdown */}
            <Text style={{marginLeft:2}} >Gender</Text>
            <Picker
              selectedValue={values.gender}
              style={styles.picker} // Applied custom style for border radius
              onValueChange={(itemValue) => setFieldValue("gender", itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            {/* Enrollment Date */}
            <Text style={{marginLeft:2}} >Enrollment Date</Text>
            <TouchableOpacity onPress={() => setShowEnrollmentDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY" // Corrected placeholder
                value={formatDate(enrollmentDate)} // Date formatted as "DD/MM/YYYY"
                editable={false}
              />
            </TouchableOpacity>
            {showEnrollmentDatePicker && (
              <DateTimePicker
                value={enrollmentDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  handleEnrollmentDateChange(e, selectedDate);
                  setFieldValue("enrollmentDate", selectedDate); // Formik field update
                }}
              />
            )}
            {errors.enrollmentDate && (
              <Text style={styles.error}>{errors.enrollmentDate}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>
            {apiResponseMessage && <Text style={{marginTop:8}}>{apiResponseMessage}</Text>} 
          </View>
        )}
      </Formik>
    </View>
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
  picker: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10, // Added border radius for Picker
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    color: "#333", 
 
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
