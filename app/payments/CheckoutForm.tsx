import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function CheckoutFormMobile() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f3f3f3" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <View
        style={{
          backgroundColor: "#f9f9f9",
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#d3d3d3",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          gap: 20,
        }}
      >
        {/* Campo: Nombre */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Nombre:</Text>
          <TextInput
            editable={false}
            value="Usuario Demo"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
              color: "#555",
            }}
          />
        </View>

        {/* Dirección */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Dirección</Text>
          <TextInput
            placeholder="Calle y número"
            placeholderTextColor="#999"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
            }}
          />
        </View>

        {/* Ciudad */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Ciudad</Text>
          <TextInput
            placeholder="Ciudad"
            placeholderTextColor="#999"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
            }}
          />
        </View>

        {/* Estado */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>
            Estado/Provincia
          </Text>
          <TextInput
            placeholder="Estado o provincia"
            placeholderTextColor="#999"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
            }}
          />
        </View>

        {/* Código Postal */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>
            Código Postal
          </Text>
          <TextInput
            placeholder="Código postal"
            placeholderTextColor="#999"
            keyboardType="numeric"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
            }}
          />
        </View>

        {/* Teléfono */}
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Teléfono</Text>
          <TextInput
            placeholder="Número de teléfono"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: "#ffffff",
              borderColor: "#e3342f",
            }}
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e3342f",
            paddingVertical: 14,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#e3342f",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Completar Compra
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
