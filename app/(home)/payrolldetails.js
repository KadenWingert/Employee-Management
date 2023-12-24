import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const payrolldetails = () => {
  const route = useRoute();

  const [employeeDetails, setEmployeeDetails] = useState(null);
  // console.log("Router.params: " + router.params);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        // Get the employeeId from the route parameters
        const { _id } = route.params;
        console.log("Router.params: " + route.params._id);
        if (!_id) {
          console.error("Id not found in route parameters.");
          return;
        }
        // Fetch employee details using the employeeId
        const response = await axios.get(
          `http://localhost:8000/employees/${_id}`
        );
        setEmployeeDetails(response.data);
      } catch (error) {
        console.log("error fetching employee details", error);
      }
    };
    fetchEmployeeDetails();
  }, [route.params]);
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
