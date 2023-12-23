import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";

const PayrollSearchResults = ({ data, input, setInput, onProfileClick }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <Pressable
                onPress={() => onProfileClick(item?.employeeId)}
                style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
              >
                <View
                  style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
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
                      {item?.employeeName?.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text>{item?.employeeName}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}></Text>
                    <Text style={{ color: "grey" }}>
                      {item?.designation}({item?.employeeId})
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default PayrollSearchResults;

const styles = StyleSheet.create({});
