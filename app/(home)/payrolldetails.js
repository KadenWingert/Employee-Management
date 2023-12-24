import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import axios from "axios";
import moment from "moment";

const PayrollDetails = () => {
  const router = useRouter();
  const route = useRoute();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [payPeriods, setPayPeriods] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const { _id } = route.params;
        if (!_id) {
          console.error("Id not found in route parameters.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/employees/${_id}`
        );
        setEmployeeDetails(response.data);
      } catch (error) {
        console.log("error fetching employee details", error);
      }
    };

    const fetchPayPeriods = () => {
      try {
        // Calculate the current payroll period (last Friday through the next Friday)
        const today = moment();
        const lastFriday = today.clone().day(-6); // Get last Friday
        const nextFriday = lastFriday.clone().add(7, "days"); // Get next Friday

        // Generate previous pay periods (4 weeks before the current one)
        const previousPayPeriods = Array.from({ length: 4 }).map((_, index) => {
          const startDate = lastFriday
            .clone()
            .subtract((index + 1) * 7, "days");
          const endDate = startDate.clone().add(6, "days");
          return {
            period: `Previous Pay Period ${index + 1}`,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
          };
        });
        setPayPeriods(previousPayPeriods);
      } catch (error) {
        console.log("error fetching pay periods", error);
      }
    };
    fetchEmployeeDetails();
    fetchPayPeriods();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => router.back()}
        style={styles.icon}
        name="arrow-back"
        size={24}
        color="white"
      />
      <View style={styles.title}>
        <Text style={styles.titleText}>Payroll Details</Text>
      </View>

      <View style={styles.topHalf}>
        <Text style={styles.heading}>Current Pay Period</Text>
        <Text style={styles.currentPayPeriod}>
          Pay Period: {moment().format("YYYY-MM-DD")} to{" "}
          {moment().add(6, "days").format("YYYY-MM-DD")}
        </Text>
        {/* Implement logic to calculate the number of days present for the current period */}
        {/* For demonstration purposes, I'll use a dummy value */}
        <Text style={styles.whiteText}>
          Days Present: {employeeDetails?.daysPresent || 0}
        </Text>
      </View>

      <View style={styles.bottomHalf}>
        <Text style={styles.heading}>Previous Pay Periods</Text>
        {payPeriods.map((period, index) => (
          <View key={index} style={styles.payPeriodContainer}>
            <Text>{period.period}</Text>
            <Text>
              Pay Period: {period.startDate} to {period.endDate}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04a1e5",
  },
  icon: {
    marginLeft: 10,
    marginTop: 10,
    position: "absolute",
    zIndex: 1,
  },
  title: {
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  topHalf: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingTop: "10%",
    alignSelf: "center",
  },
  whiteText: { color: "white", fontSize: 20 },
  currentPayPeriod: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    paddingVertical: 10,
  },

  bottomHalf: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    opacity: 0.85,
  },
  payPeriodContainer: {
    marginBottom: 10,
  },
});

export default PayrollDetails;
