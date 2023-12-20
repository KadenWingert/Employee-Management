import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const generateReports = () => {
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(moment());
  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const screenWidth = Dimensions.get("window").width;

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
  decimalPlaces: 0,
  formatYLabel: (value) => `${value}%`, // Add "%" to the y-axis labels
  yLabelsOffset: -10,
  };

const data = {
  labels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(173, 216, 230, ${opacity})`, // Light grey for lines
      strokeWidth: 2,
    },
  ],
  legend: ["% of Days Present By Month"],
};

return (
  <View style={{ flex: 1, backgroundColor: "white", }}>
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


    <Text style={{ alignSelf: 'center', color: 'white', marginBottom: 10 }}>
      Attendance Percent Present
    </Text>

    <LineChart
      data={data}
      width={screenWidth}
      paddingTop={10}
      height={220}
      chartConfig={chartConfig}
      withCustomChartConfig={{
        backgroundGradientFrom: "#0F243E",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#0F243E",
        backgroundGradientToOpacity: 1,
      }}
    />
  </View>
);
};

export default generateReports;

const styles = StyleSheet.create({});
