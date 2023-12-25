import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import axios from "axios";
import moment from "moment";
import employees from "./employees";

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
        const lastFriday = today.clone().day(-2); // Get last Friday
        const nextFriday = today.clone().day(5); // Get next Friday

        // Generate previous pay periods (4 weeks before the current one, moved up by one week)
        const previousPayPeriods = Array.from({ length: 10 }).map(
          (_, index) => {
            const startDate = today
              .clone()
              .isoWeekday(1)
              .subtract((index + 1) * 7, "days");
            const endDate = startDate.clone().add(6, "days");
            return {
              period: `Previous Pay Period ${index + 1}`,
              startDate: startDate.format("MM/DD/YYYY"),
              endDate: endDate.format("MM/DD/YYYY"),
            };
          }
        );
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
        <View style={styles.moneyContainer}>
          <FontAwesome5 name="dollar-sign" size={24} color="#24FB06" />
          <Text style={styles.heading}> Pay Period </Text>
          <FontAwesome5 name="dollar-sign" size={24} color="#24FB06" />
        </View>
        <Text style={styles.currentPayPeriod}>
          {"Monday " + moment().isoWeekday(1).format("MM/DD/YYYY")}
          {" - "}
          {"Sunday " +
            moment().isoWeekday(0).add(7, "days").format("MM/DD/YYYY")}
        </Text>

        {employeeDetails && (
          <View>
            <View style={styles.mainInfoContainer}>
              <Text style={styles.boldWhiteText}>Gross Pay: </Text>
              <Text style={styles.whiteText}>
                {(employeeDetails.salary / 52).toFixed(2)}
              </Text>
            </View>
            <View style={styles.mainInfoContainer}>
              <Text style={styles.boldWhiteText}>Taxes Deducted: </Text>
              <Text style={styles.whiteText}>
                {((employeeDetails.salary / 52) * 0.13).toFixed(2)}
              </Text>
            </View>
            <View style={styles.mainInfoContainer}>
              <Text style={styles.boldWhiteText}>Net Pay: </Text>
              <Text style={styles.whiteText}>
                {(
                  employeeDetails.salary / 52 -
                  (employeeDetails.salary / 52) * 0.13
                ).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomHalf}>
        <View style={styles.headerRow}>
          <Text style={styles.headerColumn}>Pay Date</Text>
          <Text style={styles.headerColumn}>Pay Period</Text>
          <Text style={styles.headerColumn}>Compensation</Text>
        </View>
        <ScrollView>
          {payPeriods.map((period, index) => (
            <View key={index} style={styles.payPeriodContainer}>
              {/* Row with pay date, pay period, and compensation values */}
              <View style={styles.dataRow}>
                <Text style={(styles.dataColumn, styles.row2)}>
                  <FontAwesome5 name="calendar-alt" size={24} color="black" />
                  {"   " + period.startDate}
                </Text>
                <Text style={styles.dataColumn}>
                  {period.startDate}
                  {"\n"}
                  {period.endDate}
                </Text>
                <Text style={(styles.dataColumn, styles.row3)}>
                  {employeeDetails &&
                    (
                      employeeDetails.salary / 52 -
                      (employeeDetails.salary / 52) * 0.13
                    ).toFixed(2)}
                </Text>
                <Text style={styles.dataColumn}>{period.compensation}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  moneyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  mainInfoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: "5%",
  },
  boldWhiteText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  whiteText: {
    color: "white",
    fontSize: 20,
  },
  currentPayPeriod: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    paddingVertical: 20,
  },
  bottomHalf: {
    flex: 2,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: "white",
    padding: 15,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerColumn: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderBottomWidth: 1,
    paddingTop: 15,
    alignContent: "space-evenly",
  },

  row2: {
    marginHorizontal: "-5%",
  },
  row3: {
    alignSelf: "center",
    paddingLeft: 25,
  },
  payPeriodContainer: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
});

export default PayrollDetails;
