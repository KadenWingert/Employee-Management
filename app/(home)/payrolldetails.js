import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const payrolldetails = () => {
  const router = useRouter();

  const [employeeDetails, setEmployeeDetails] = useState(null);

  // Fetch employee details when the component mounts
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        // Get the employeeId from the query parameters
        console.log("Route parameters:", router.query);
        const { employeeId } = router.query;

        if (!employeeId) {
          console.error("EmployeeId not found in route parameters.");
          return;
        }

        // Fetch employee details using the employeeId
        const response = await axios.get(
          `http://localhost:8000/employees/${employeeId}`
        );
        setEmployeeDetails(response.data);
      } catch (error) {
        console.log("error fetching employee details", error);
      }
    };

    fetchEmployeeDetails();
  }, [router.query]); // Re-run the effect when the query parameters change
  return (
    <View>
      <Ionicons
        onPress={() => router.back()}
        style={{ marginLeft: 10 }}
        name="arrow-back"
        size={24}
        color="black"
      />
      <Text>payrolldetails</Text>

      {employeeDetails && (
        <View>
          <Text>Employee Name: {employeeDetails.employeeName}</Text>
          <Text>Designation: {employeeDetails.designation}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    </View>
  );
};

export default payrolldetails;

const styles = StyleSheet.create({});
