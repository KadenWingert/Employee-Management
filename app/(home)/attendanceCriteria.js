import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import FlipCard from "react-native-flip-card";

const AttendanceCriteria = () => {
  const router = useRouter();
  const [cardStates, setCardStates] = useState(Array(5).fill(false));

  const sections = [
    {
      title: "Sick Days",
      primaryColor: "#64ae01",
      secondaryColor: "#e0e9dc",
      icon: <Ionicons name="person-remove-outline" size={24} color="black" />,
      about:
        "Employees are expected to notify their immediate supervisor or HR representative in advance for any planned time off, such as vacations, appointments, or any other anticipated absence. The notice period required may vary based on the nature and duration of the absence. Absences need to be communicated through our designated communication channels or systems.",
    },
    {
      title: "Vacation Days",
      primaryColor: "#f7d202",
      secondaryColor: "#edecd8",
      icon: <MaterialIcons name="assignment-late" size={24} color="black" />,
      about:
        "Employees are entitled to a specified number of paid vacation days per year, depending on their length of service and position within the company. Vacation requests should be submitted well in advance through our designated leave management system. Approval is subject to business needs and team coordination.",
    },
    {
      title: "Unscheduled Absence",
      primaryColor: "#278caa",
      secondaryColor: "#d9e5ea",
      icon: <FontAwesome name="calendar-times-o" size={24} color="black" />,
      about:
        "In the event of an unscheduled absence due to illness or any unforeseen circumstances, employees are required to notify their supervisor or HR as soon as possible. This notification should include the reason for the absence and an estimated duration, if possible. Employees may be asked to provide documentation for extended absences or repeated unscheduled absences.",
    },
    {
      title: "Tardiness",
      primaryColor: "#dd3f25",
      secondaryColor: "#ebdfdf",
      icon: <MaterialIcons name="assignment-late" size={24} color="black" />,
      about:
        "We emphasize the importance of punctuality. Tardiness, defined as arriving late to work or meetings, may result in verbal reminders, written warnings, and, in severe cases, suspension or termination. Open communication is encouraged, and our HR department is available for support. Our aim is to foster a positive and efficient work environment.",
    },
    {
      title: "Holidays",
      primaryColor: "#B164F3",
      secondaryColor: "#EAD1FF",
      icon: <Fontisto name="holiday-village" size={24} color="black" />,
      about:
        "We observe a set of designated holidays throughout the year. These holidays include national, cultural, and company-specific days. All employees are entitled to paid time off on these holidays. In the event that an employee is required to work on a holiday due to the nature of their role, they will be provided with compensatory time off or other arrangements as per company policy",
    },
  ];

  //   const navigateToSection = (index) => {
  //     const newCardStates = [...cardStates];
  //     newCardStates[index] = !newCardStates[index];
  //     setCardStates(newCardStates);
  //   };

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Attendance Criteria</Text>
      </View>

      {sections.map((section, index) => (
        <FlipCard
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
        >
          {/* Face Side */}
          <View
            style={[
              styles.face,
              {
                backgroundColor: section.primaryColor,
                margin: "11%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between", // Align items with space between them
              },
            ]}
          >
            <View style={styles.iconContainer}>{section.icon}</View>
            <Text
              style={[
                styles.cardTitle,
                {
                  backgroundColor: section.primaryColor,
                  textAlign: "center",
                  flex: 1,
                  paddingRight: "13%",
                },
              ]}
            >
              {section.title}
            </Text>
          </View>
          {/* Back Side */}
          <View
            style={[
              styles.back,
              {
                backgroundColor: section.secondaryColor,
                padding: 10,
                flex: 1, // Ensure the back view takes the entire space
              },
            ]}
          >
            <Text style={styles.explanationText}>{section.about}</Text>
          </View>
        </FlipCard>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center", // Center content vertically
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center content horizontally
  },
  iconContainer: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  explanationText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});

export default AttendanceCriteria;
