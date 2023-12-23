import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

const index = () => {
  const router = useRouter();
  return (
    <ScrollView>
      <LinearGradient colors={["f3e7e9", "#e3eeff"]} style={{ height: "150%" }}>
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Employee Managament System
            </Text>
            <Entypo name="lock" size={24} color="black" />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => router.push("/(home)/employees")}
              style={{
                backgroundColor: "#ffdde1",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Employee List
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(home)/markattendance")}
              style={{
                backgroundColor: "#ffdde1",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Mark Attendance
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
              flex: 1,
            }}
          >
            <Pressable
              onPress={() => router.push("/(home)/summary")}
              style={{
                backgroundColor: "#F2F2F2",
                borderRadius: 6,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Octicons name="repo-pull" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Monthly Report
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(home)/generateReports")}
              style={{
                backgroundColor: "#F2F2F2",
                borderRadius: 6,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  padding: 10,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="barschart" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                View Reports
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(home)/payroll")}
              style={{
                backgroundColor: "#F2F2F2",
                borderRadius: 6,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 15,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Payroll
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#f79d00",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="guy-fawkes-mask"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={{ marginTop: 7 }}>Attendance Criteria</Text>
            </View>
            <View
              style={{
                backgroundColor: "#ABCABA",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="bar-chart" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7 }}>Increased Workflow</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#D3CCE3",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",

                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="guy-fawkes-mask"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={{ marginTop: 7 }}>Cost Savings</Text>
            </View>
            <View
              style={{
                backgroundColor: "#bdc3c7",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="bar-chart" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7 }}>Employee Performance</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
