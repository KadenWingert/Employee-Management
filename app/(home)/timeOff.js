import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Fumi } from "react-native-textinput-effects";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const TimeOff = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSubmit = async () => {
    try {
      // Fetch all employees using Axios
      const response = await axios.get("http://localhost:8000/employees");
      const employeesData = response.data;

      // Log the employeesData
      console.log("Employees Data:", employeesData);

      const matchingEmployee = employeesData.find((employee) => {
        console.log("Employee ID from API:", employee.employeeId);
        console.log("Input Employee ID:", employeeId);
        return employee.employeeId === employeeId;
      });

      if (matchingEmployee) {
        console.log("Matching Employee:", matchingEmployee);

        // Employee is valid
        const postResponse = await axios.post(
          "http://localhost:8000/requestTimeOff",
          {
            employeeId: employeeId,
            dateRequested: selectedDate, // Make sure 'selectedDate' is defined in your component
          }
        );

        const result = postResponse.data;
        console.log("Post Response:", result);

        // Display success message with employee name
        setSuccessMessage(
          `Request submitted successfully for ${matchingEmployee.employeeName}`
        );

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        // Employee is not valid
        console.log("Employee not found");
        setErrorMessage("Employee not found");

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting time off request:", error);
      setErrorMessage("Error submitting time off request");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    // Cleanup messages on component unmount
    return () => {
      setSuccessMessage(null);
      setErrorMessage(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => router.back()}
        style={{
          marginLeft: 10,
          marginTop: 10,
          position: "absolute",
          zIndex: 1,
        }}
        name="arrow-back"
        size={24}
        color="black"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Request Time Off</Text>
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }}
      />

      <View style={styles.inputContainer}>
        <Fumi
          label={"Employee Id"}
          iconClass={AntDesign}
          iconName={"idcard"}
          iconSize={24}
          iconWidth={40}
          inputPadding={16}
          style={styles.fumi}
          value={employeeId}
          onChangeText={(text) => setEmployeeId(text)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>

      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.messageText}>{successMessage}</Text>
        </View>
      )}

      {errorMessage && (
        <View style={styles.errorMessage}>
          <Text style={styles.messageText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
  },
  fumi: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    margin: 20,
  },
  successMessage: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  errorMessage: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  messageText: {
    color: "white",
  },
});

export default TimeOff;
