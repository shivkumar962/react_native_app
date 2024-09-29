import React, { useState, useEffect } from "react";
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
import { useRoute } from "@react-navigation/native";
// Form Validation Schema
const AddStudentSchema = Yup.object().shape({
  admissionNumber: Yup.string().required("Admission Number is required"),
  dob: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  enrollmentDate: Yup.date().required("Enrollment Date is required"),
});

export default function UpdateStudent({ navigation }) {
  const route = useRoute();
  const { studentDetails } = route.params;
  console.log("studentDetails==>", studentDetails.gender);

  const [dob, setDob] = useState(new Date(studentDetails.dob));
  const [showDobPicker, setShowDobPicker] = useState(false);

  const [enrollmentDate, setEnrollmentDate] = useState(
    new Date(studentDetails.enrollmentDate)
  ); // Set enrollment date from studentDetails
  const [showEnrollmentDatePicker, setShowEnrollmentDatePicker] =
    useState(false);
  const [gender, setGender] = useState(studentDetails.gender);

  const [apiResponseMessage, setApiResponseMessage] = useState("");
  setTimeout(() => {
    setApiResponseMessage("");
  }, 5000);

  // Helper function to format date as "DD/MM/YYYY"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB"); // 'en-GB' formats as DD/MM/YYYY
  };

  const handleDobChange = (event, selectedDate, setFieldValue) => {
    const currentDate = selectedDate || dob;
    setShowDobPicker(false);
    setDob(currentDate);
    setFieldValue("dob", currentDate); // Formik field update
  };

  const handleEnrollmentDateChange = (event, selectedDate, setFieldValue) => {
    const currentDate = selectedDate || enrollmentDate;
    setShowEnrollmentDatePicker(false);
    setEnrollmentDate(currentDate);
    setFieldValue("enrollmentDate", currentDate); // Formik field update
  };

  const handleSubmit = async (values) => {
    console.log("form value===>", values);

    try {
      // API call
      const response = await axios.put(
        `http://192.168.31.231:3000/students/${studentDetails.id}`,
        {
          admissionNumber: values.admissionNumber,
          dob: formatDate(dob),
          gender: values.gender,
          enrollmentDate: formatDate(enrollmentDate),
        }
      );
      console.log("API Response:", response.data);
      setApiResponseMessage(response.data.message);
      if (response.data.status) {
        alert("Student updated successfully!");
        navigation.navigate("Student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("There was an error updating the student.");
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          admissionNumber: studentDetails.admissionNumber,
          dob: dob, // Set dob from useState
          gender: gender,
          enrollmentDate: enrollmentDate, // Set enrollment date from useState
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
            <Text style={styles.title}>Update Student</Text>

            {/* Admission Number */}
            <Text style={{ marginLeft: 2 }}>Admission Number</Text>
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
            <Text style={{ marginLeft: 2 }}>Date of Birth</Text>
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
                onChange={(e, selectedDate) =>
                  handleDobChange(e, selectedDate, setFieldValue)
                }
              />
            )}
            {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

            {/* Gender Dropdown */}
            <Text style={{ marginLeft: 2 }}>Gender</Text>
            <Picker
              selectedValue={values.gender}
              style={styles.picker}
              onValueChange={(itemValue) => {
                console.log("itemValue", itemValue);

                setFieldValue("gender", itemValue); // Formik gender ko update karega
                // setFieldTouched("gender", true); // Field ko touched mark karega
              }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Other" value="OTHER" />
            </Picker>
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            {/* Enrollment Date */}
            <Text style={{ marginLeft: 2 }}>Enrollment Date</Text>
            <TouchableOpacity onPress={() => setShowEnrollmentDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={formatDate(enrollmentDate)} // Date formatted as "DD/MM/YYYY"
                editable={false}
              />
            </TouchableOpacity>
            {showEnrollmentDatePicker && (
              <DateTimePicker
                value={enrollmentDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) =>
                  handleEnrollmentDateChange(e, selectedDate, setFieldValue)
                }
              />
            )}
            {errors.enrollmentDate && (
              <Text style={styles.error}>{errors.enrollmentDate}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Student</Text>
            </TouchableOpacity>
            {apiResponseMessage && (
              <Text style={{ marginTop: 8 }}>{apiResponseMessage}</Text>
            )}
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
    borderRadius: 10,
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
