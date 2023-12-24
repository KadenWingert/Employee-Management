import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const AttendanceCriteria = () => {
  const router = useRouter();
  const [cardStates, setCardStates] = useState(Array(5).fill(false));

  const sections = [
    {
      title: "Sick Days",
      primaryColor: "#64ae01",
      secondaryColor: "#e0e9dc",
      icon: <Ionicons name="person-remove-outline" size={24} color="black" />,
    },
    {
      title: "Vacation Days",
      primaryColor: "#f7d202",
      secondaryColor: "#edecd8",
      icon: <MaterialIcons name="assignment-late" size={24} color="black" />,
    },
    {
      title: "Unscheduled Absence",
      primaryColor: "#278caa",
      secondaryColor: "#d9e5ea",
      icon: <FontAwesome name="calendar-times-o" size={24} color="black" />,
    },
    {
      title: "Tardiness",
      primaryColor: "#dd3f25",
      secondaryColor: "#ebdfdf",
      icon: <MaterialIcons name="assignment-late" size={24} color="black" />,
    },
    {
      title: "Holidays",
      primaryColor: "#B164F3",
      secondaryColor: "#EAD1FF",
      icon: <Fontisto name="holiday-village" size={24} color="black" />,
    },
  ];

  const navigateToSection = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
    console.log(`Toggled card ${index}`);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => router.back()}
        style={styles.backIcon}
        name="arrow-back"
        size={24}
        color="black"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Attendance Criteria</Text>
      </View>

      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: cardStates[index]
                ? section.secondaryColor
                : section.primaryColor,
              marginTop: 20,
              marginBottom: 10,
            },
          ]}
          onPress={() => navigateToSection(index)}
        >
          <View style={styles.sectionContainer}>
            <Text>
              {cardStates[index] ? (
                <Text style={styles.explanationText}>
                  Explanation for {section.title} goes here.
                </Text>
              ) : (
                <Text style={styles.cardTitle}>{section.title}</Text>
              )}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    position: "absolute",
    zIndex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  card: {
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  explanationText: {
    marginTop: 20,
    fontSize: 16,
    color: "black",
  },
});

export default AttendanceCriteria;
