import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function TarjetasManager() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Contenedor principal */}
      <View
        style={{
          backgroundColor: "#ffffff",
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#d1d1d1",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        {/* Título */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#e3342f",
            marginBottom: 16,
          }}
        >
          Tus tarjetas guardadas
        </Text>

        {/* Tarjetas guardadas (ejemplo) */}
        <View style={{ marginBottom: 20 }}>
          

          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>María López - •••• 0099 - Expira 11/27</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity>
                <Text style={{ color: "#e3342f" }}>Por defecto</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: "#e3342f" }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Formulario  */}
        <View style={{ gap: 16 }}>
          {/* Nombre titular */}
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#e3342f",
                marginBottom: 4,
              }}
            >
              Nombre del titular
            </Text>

            <TextInput
              placeholder="JUAN PEREZ"
              placeholderTextColor="#888"
              style={{
                borderWidth: 1,
                borderColor: "#d1d1d1",
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#ffffff",
                fontSize: 16,
              }}
            />
          </View>

          {/* Datos de tarjeta */}
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#e3342f",
                marginBottom: 4,
              }}
            >
              Datos de la tarjeta
            </Text>

            {/* CardElement */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#d1d1d1",
                padding: 14,
                borderRadius: 8,
                backgroundColor: "#ffffff",
              }}
            >
              <Text style={{ color: "#555" }}>•••• •••• •••• ••••</Text>
            </View>
          </View>

          {/* Botón */}
          <TouchableOpacity
            style={{
              backgroundColor: "#e3342f",
              paddingVertical: 12,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#e3342f",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
            >
              Guardar tarjeta
            </Text>
          </TouchableOpacity>

          {/* Mensaje estático */}
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: "#e3342f",
            }}
          >
            Mensaje de estado 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
