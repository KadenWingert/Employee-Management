import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PayrollSearchResults from "../../components/PayrollSearchResults";

const payroll = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const [employees, setEmployees] = useState([]);
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

  const onProfileClick = (employeeId) => {
    // Navigate to the payroll details screen with the selected employeeId
    router.push({
      pathname: "/(home)/payrolldetails",
      params: { employeeId },
    });
    console.log("Employee ID on Payroll screen: " + employeeId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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

      {employees.length > 0 && (
        <PayrollSearchResults
          data={employees}
          input={input}
          setInput={setInput}
          onProfileClick={onProfileClick}
        />
      )}
    </View>
  );
};

export default payroll;

const styles = StyleSheet.create({});
