import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";

const generateReports = () => {
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(moment());
  const [attendanceData, setAttendanceData] = useState([]);
  
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
  }, []);

  const screenWidth = Dimensions.get("window").width;
//   const totalPresent = attendanceData.reduce(
//     (acc, employee) => acc + employee.present,
//     0
//   );
//   const totalAbsent = attendanceData.reduce(
//     (acc, employee) => acc + employee.absent,
//     0
//   );
//   console.log("Total Present:" + totalPresent);
//   console.log("Total Absent:" + totalAbsent);
  const chartConfig = {
    backgroundGradientFrom: "#0c36a8", // Deep blue background
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#0F243E",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(173, 216, 230, ${opacity})`, // Light grey for dots
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: "6", // Dot size
      strokeWidth: "2",
      stroke: "#FFFFFF", // White color for dots
      fill: "#FFFFFF", // White color for the center of the dots
    },

    propsForLabels: {
      fontFamily: "Arial", // Specify the font family for labels
      fontSize: 12, // Specify the font size for labels
      fill: "white", // Blue color for labels
    },
    propsForVerticalLabels: {
      fill: "white", // White color for y-axis labels
    },
    propsForHorizontalLabels: {
      fill: "white", // White color for x-axis labels
    },
    propsForBackgroundLines: {
      stroke: "white", // Set the color of the legend circle to white
      strokeWidth: 1,
    },
    decimalPlaces: 0,
    formatYLabel: (value) => `${value}%`, // Add "%" to the y-axis labels
    yLabelsOffset: -10,
  };

const data = {
  labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
  datasets: [
    {
      data: attendanceData.map((employee) => {
        console.log("Individual employee Present Count:" + employee.present);
         return (employee.present / (employee.present + employee.absent)) * 100 || 0;
      }),
      color: (opacity = 1) => "white", // Light grey for lines
      strokeWidth: 2,
    },
  ],
  legend: ["% of Days Present By Month"],
};


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
      }}
    >
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

      <Text style={{ alignSelf: "center", marginBottom: 10 }}>
        Attendance Percent Present
      </Text>
      <View
        style={{
          paddingHorizontal: 16, // Add horizontal padding to create a card-like appearance
          marginVertical: 8,
          borderRadius: 8,
          backgroundColor: "white", // Set background color to match the chart background
        }}
      >
        <LineChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 8, marginTop: 10 }}
          withCustomChartConfig={{
            backgroundGradientFrom: "#0F243E",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#0F243E",
            backgroundGradientToOpacity: 1,
          }}
        />
      </View>
    </View>
  );
};

export default generateReports;

const styles = StyleSheet.create({});
