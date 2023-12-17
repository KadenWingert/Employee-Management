import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const summary = () => {
  const router = useRouter();
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
    console.log("NEXT MONTH: " + formatDate(nextMonth));
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
        console.log("PREV MONTH: " + formatDate(prevMonth));
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };
  const fetchAttendanceReport = async () => {
    try {
      const respone = await axios.get(
        `http://localhost:8000/attendance-report-all-employees`,
        {
          params: {
            month: currentDate.month()+1,
            year: currentDate.year(),
          },
        }
      );

      setAttendanceData(respone.data.report);
    } catch (error) {
      console.log("Error fetching attendance", error);
    }
  };
  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);
  console.log(attendanceData);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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

      <View style={{ marginHorizontal: 12 }}>
        {attendanceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                margin: 5,
                padding: 5,
                backgroundColor: "#A1FFCE",
                borderRadius: 5,
              }}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Present</DataTable.Title>
                  <DataTable.Title>Absent</DataTable.Title>
                  <DataTable.Title>Half Days</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.present}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});
