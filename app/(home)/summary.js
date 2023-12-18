import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../../components/SearchResults";

const summary = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showAllDetails, setShowAllDetails] = useState(true);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);


  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
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
            month: currentDate.month() + 1,
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

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployeeId(
      employeeId === selectedEmployeeId ? null : employeeId
    );
  };
  console.log(attendanceData);
  const filteredAttendanceData = attendanceData.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
  const toggleShowAllDetails = () => {
    if (showAllDetails) {
      // Clear selected employees if "Show All" is toggled off
      setSelectedEmployeeIds([]);
    }
    setShowAllDetails(!showAllDetails);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />
        </Pressable>
      </View>
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
      <Pressable
        onPress={toggleShowAllDetails}
        style={{
          position: "absolute",
          right: 25,
          top: 55,
        }}
      >
        <Text style={{ color: "blue" }}>
          {showAllDetails ? "Hide All" : "Show All"}
        </Text>
      </Pressable>

      <View style={{ marginHorizontal: 12 }}>
        {filteredAttendanceData.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <Pressable onPress={() => handleEmployeeClick(item?.employeeId)}>
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
            </Pressable>

            {(showAllDetails || selectedEmployeeId === item?.employeeId) && (
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
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});
