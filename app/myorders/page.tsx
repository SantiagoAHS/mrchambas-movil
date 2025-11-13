import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import OrdersDetails from "@/components/myorders/ordersdetails";

export default function MyordersPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <OrdersDetails />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 16,
  },
  innerContainer: {
    width: "90%",
    marginTop: 16,
  },
});
