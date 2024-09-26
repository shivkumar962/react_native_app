import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddStudentSchema = Yup.object().shape({
  admissionNumber: Yup.string().required('Admission Number is required'),
  dob: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  enrollmentDate: Yup.date().required('Enrollment Date is required'),
  userId: Yup.string().required('User ID is required'),
});

export default function AddStudent() {
  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    // Yahan API call ya database update karne ka code likhein
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          admissionNumber: '',
          dob: '',
          gender: '',
          enrollmentDate: '',
          userId: '',
        }}
        validationSchema={AddStudentSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Add Student</Text>

            <TextInput
              style={styles.input}
              placeholder="Admission Number"
              onChangeText={handleChange('admissionNumber')}
              onBlur={handleBlur('admissionNumber')}
              value={values.admissionNumber}
            />
            {errors.admissionNumber && <Text style={styles.error}>{errors.admissionNumber}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
              value={values.dob}
            />
            {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Gender"
              onChangeText={handleChange('gender')}
              onBlur={handleBlur('gender')}
              value={values.gender}
            />
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Enrollment Date (YYYY-MM-DD)"
              onChangeText={handleChange('enrollmentDate')}
              onBlur={handleBlur('enrollmentDate')}
              value={values.enrollmentDate}
            />
            {errors.enrollmentDate && <Text style={styles.error}>{errors.enrollmentDate}</Text>}

            <TextInput
              style={styles.input}
              placeholder="User ID"
              onChangeText={handleChange('userId')}
              onBlur={handleBlur('userId')}
              value={values.userId}
            />
            {errors.userId && <Text style={styles.error}>{errors.userId}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Student</Text>
            </TouchableOpacity>
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
    color: 'red',
    marginBottom: 10,
  },
});
