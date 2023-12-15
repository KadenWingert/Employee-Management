import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather, Entypo } from "@expo/vector-icons";

const index = () => {
    return (
        <ScrollView>
            <LinearGradient colors={["#7f7fd5", "#e9e4f0"]} style={{ flex: 1 }}>
            <View>
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <Feather name="bar-chart" size={24} color="black" />
                    <Text>Employee Management System</Text>
                    <Entypo name="lock" size={24} color="black" />
                </View>
            </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})