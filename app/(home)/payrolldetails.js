import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const payrolldetails = () => {
  const router = useRouter();

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
    </View>
  );
};

export default payrolldetails;

const styles = StyleSheet.create({});
