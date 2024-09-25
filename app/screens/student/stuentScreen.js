import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
// import { BASE_URL, STUDENTS, LOGIN_URL } from "@env";
import Loader from "../../components/loader/loader";

export default function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    // Async function defined inside useEffect
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://192.168.31.231:3000/students`);
        // const response = await axios.get(`${BASE_URL}${STUDENTS}`);
        setStudent(response.data.data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    };

    fetchStudents(); // Calling the async function
  }, []); // Empty dependency array to run it once on mount

  console.log("Fetched students:", student);

  return (
    <>
      {!student.length > 0 ? (
        <Loader />
      ) : (
        <>
          <View style={{backgroundColor:"#f7f7f7"}}>
            <TouchableOpacity>
              <Text style={styles.addStudentButton}>Add Student</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
            {student.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.name}>
                  {" "}
                  Admission Number: {item.admissionNumber}{" "}
                </Text>
                <Text style={styles.details}>Class: {item.classId}</Text>
                <Text style={styles.details}>Date of birth: {item.dob}</Text>
                <Text style={styles.details}>
                  Enrollment date: {item.enrollmentDate}
                </Text>
                <Text style={styles.details}>Gender: {item.gender}</Text>
                <Text style={styles.details}>Id: {item.id}</Text>
                <Text style={styles.details}>Parent Id: {item.parentId}</Text>
                <Text style={styles.details}>UserId: {item.userId}</Text>
                <Text style={styles.details}>Status: {item.status}</Text>
                <View style={{flex: 2, flexDirection: "row",justifyContent:"space-between"}}>
                  <TouchableOpacity>
                    <Text style={styles.updateDeleteStudentButton}>Update Student</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.updateDeleteStudentButton}>Delete Student</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  addStudentButton: {
    backgroundColor: "green",
    color: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-end",
    fontSize: 15,
    fontWeight: "600",
  },
  updateDeleteStudentButton: {
    backgroundColor: "green",
    color: "white",
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "600",
    
  },
});
