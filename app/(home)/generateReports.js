import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BarChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";

const generateReports = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [attendanceData, setAttendanceData] = useState([]);

  const goToNextMonth = () => {
    const nextDate = moment(currentDate).add(1, "months");
    setCurrentDate(nextDate);
  };

  const goToPrevMonth = () => {
    const prevDate = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/attendance-report-all-employees`,
          {
            params: {
              month: currentDate.month() + 1,
              year: currentDate.year(),
            },
          }
        );
        console.log(response.data.report);
        setAttendanceData(response.data.report);
      } catch (error) {
        console.log("Error fetching attendance data", error);
      }
    };

    fetchAttendanceData();
  }, [currentDate]);

  const totalDays = attendanceData.reduce(
    (acc, employee) => acc + employee.present + employee.absent,
    0
  );
  const totalPresent = attendanceData.reduce(
    (acc, employee) => acc + employee.present,
    0
  );
  const totalAbsent = attendanceData.reduce(
    (acc, employee) => acc + employee.absent,
    0
  );

  const percentPresent = totalDays !== 0 ? (totalPresent / totalDays) * 100 : 0;
  const percentAbsent = totalDays !== 0 ? (totalAbsent / totalDays) * 100 : 0;
  console.log(
    "Percent Present: " + percentPresent + "Percent Absent: " + percentAbsent
  );

  // Prepare data for the chart
  const chartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [percentPresent, percentAbsent],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontFamily: "Arial",
      fontSize: 12,
      fill: "black",
    },
    decimalPlaces: 0,
    verticalLabelRotation: 0, // Ensure vertical labels are not rotated
  };

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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 10,
        }}
      >
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Company Attendance Overview</Text>
        <View style={{ padding: 10, paddingTop: "8%" }}>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Total Days Logged:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{totalDays}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Present:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{totalPresent}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Absent:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{totalAbsent}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Percent Present:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{percentPresent.toFixed(2)}%</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Percent Absent:</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>{percentAbsent.toFixed(2)}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={365}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    </View>
  );
};

export default generateReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light gray background
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  labelText: {
    fontWeight: "bold",
  },
  row: { flexDirection: "row" },
  value: {
    marginBottom: 10,
    marginLeft: 10,
  },
  cardContainer: { display: "flex" },

  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  title: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
