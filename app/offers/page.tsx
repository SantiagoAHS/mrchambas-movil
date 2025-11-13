"use client";

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  Wrench,
  Scissors,
  Zap,
  Paintbrush,
  Home,
  Car,
  Gift,
  Star,
  Trophy,
  Users,
  Target,
} from "lucide-react-native";

export default function OfertasPage() {
  const [serviciosCompletados] = useState(6);

  const cuponesDisponibles = [
    {
      id: "1",
      titulo: "Primera Vez",
      descuento: "20%",
      descripcion: "Descuento para nuevos clientes en cualquier servicio",
      icono: <Gift color="#fff" size={22} />,
      color: "#f97316",
      disponible: true,
      fechaExpiracion: "31 Dic 2024",
    },
    {
      id: "2",
      titulo: "Plomería Express",
      descuento: "15%",
      descripcion: "Descuento en servicios de plomería de emergencia",
      icono: <Wrench color="#fff" size={22} />,
      color: "#f59e0b",
      disponible: true,
      fechaExpiracion: "15 Ene 2025",
    },
    {
      id: "3",
      titulo: "Jardín Perfecto",
      descuento: "25%",
      descripcion: "Descuento en servicios de jardinería y paisajismo",
      icono: <Scissors color="#fff" size={22} />,
      color: "#ea580c",
      disponible: true,
      usado: false,
      fechaExpiracion: "28 Feb 2025",
    },
  ];

  const cuponesProgreso = [
    {
      id: "p1",
      titulo: "Cliente Fiel",
      descuento: "30%",
      descripcion: "Descuento especial después de 4 servicios completados",
      icono: <Star color="#fff" size={22} />,
      color: "#f59e0b",
      serviciosRequeridos: 4,
      serviciosActuales: Math.min(serviciosCompletados, 4),
      recompensa: "30% en tu próximo servicio",
    },
    {
      id: "p2",
      titulo: "Experto en Casa",
      descuento: "40%",
      descripcion: "Descuento premium después de 8 servicios completados",
      icono: <Home color="#fff" size={22} />,
      color: "#f97316",
      serviciosRequeridos: 8,
      serviciosActuales: Math.min(serviciosCompletados, 8),
      recompensa: "40% + servicio de limpieza gratis",
    },
    {
      id: "p3",
      titulo: "VIP Platinum",
      descuento: "50%",
      descripcion: "Máximo descuento después de 12 servicios completados",
      icono: <Trophy color="#fff" size={22} />,
      color: "#d97706",
      serviciosRequeridos: 12,
      serviciosActuales: Math.min(serviciosCompletados, 12),
      recompensa: "50% + prioridad en emergencias",
    },
    {
      id: "p4",
      titulo: "Referido Especial",
      descuento: "20%",
      descripcion: "Descuento por cada 2 amigos que refieran nuestros servicios",
      icono: <Users color="#fff" size={22} />,
      color: "#b45309",
      serviciosRequeridos: 2,
      serviciosActuales: 1,
      recompensa: "20% por cada 2 referidos",
    },
  ];

  const calcularProgreso = (actual: number, requerido: number) =>
    Math.min((actual / requerido) * 100, 100);

  const esCuponDesbloqueado = (actual: number, requerido: number) => actual >= requerido;

  return (
    <ScrollView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Ofertas y Cupones</Text>
        <Text style={styles.subtitle}>Gana descuentos increíbles usando nuestros servicios</Text>
        <View style={styles.counter}>
          <Target color="#ea580c" size={18} />
          <Text style={styles.counterText}>
            Servicios completados: {serviciosCompletados}
          </Text>
        </View>
      </View>

      {/* Cupones Disponibles */}
      <Text style={styles.sectionTitle}>🎁 Cupones Disponibles</Text>
      <View style={styles.cardGrid}>
        {cuponesDisponibles.map((cupon) => (
          <View key={cupon.id} style={[styles.card, { borderTopColor: cupon.color }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: cupon.color }]}>
                {cupon.icono}
              </View>
              <Text style={styles.discount}>{cupon.descuento} OFF</Text>
            </View>
            <Text style={styles.cardTitle}>{cupon.titulo}</Text>
            <Text style={styles.cardText}>{cupon.descripcion}</Text>
            <Text style={styles.cardDate}>Válido hasta: {cupon.fechaExpiracion}</Text>

            <TouchableOpacity
              disabled={cupon.usado}
              style={[
                styles.button,
                { backgroundColor: cupon.usado ? "#9ca3af" : "#ea580c" },
              ]}
            >
              <Text style={styles.buttonText}>
                {cupon.usado ? "Cupón Usado" : "Usar Cupón"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Cupones por Desbloquear */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>🏆 Cupones por Desbloquear</Text>
      <View>
        {cuponesProgreso.map((cupon) => {
          const progreso = calcularProgreso(
            cupon.serviciosActuales,
            cupon.serviciosRequeridos
          );
          const desbloqueado = esCuponDesbloqueado(
            cupon.serviciosActuales,
            cupon.serviciosRequeridos
          );

          return (
            <View
              key={cupon.id}
              style={[
                styles.progressCard,
                desbloqueado && { borderColor: "#f97316", borderWidth: 2 },
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: cupon.color }]}>
                {cupon.icono}
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{cupon.titulo}</Text>
                <Text style={styles.cardText}>{cupon.descripcion}</Text>

                {/* Barra de progreso */}
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progreso}%`, backgroundColor: "#f97316" }]}
                  />
                </View>
                <Text style={styles.progressInfo}>
                  {desbloqueado
                    ? `🎉 ${cupon.recompensa}`
                    : `Faltan ${cupon.serviciosRequeridos - cupon.serviciosActuales} servicios`}
                </Text>

                <TouchableOpacity
                  disabled={!desbloqueado}
                  style={[
                    styles.button,
                    { backgroundColor: desbloqueado ? "#f97316" : "#9ca3af" },
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {desbloqueado ? "Reclamar Cupón" : `${Math.round(progreso)}% Completado`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Servicios Disponibles */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>🧰 Nuestros Servicios</Text>
        <View style={styles.serviceGrid}>
          {[
            { nombre: "Plomería", icono: <Wrench color="#ea580c" size={22} /> },
            { nombre: "Jardinería", icono: <Scissors color="#f59e0b" size={22} /> },
            { nombre: "Electricidad", icono: <Zap color="#f97316" size={22} /> },
            { nombre: "Pintura", icono: <Paintbrush color="#f59e0b" size={22} /> },
            { nombre: "Limpieza", icono: <Home color="#b45309" size={22} /> },
            { nombre: "Mecánica", icono: <Car color="#78350f" size={22} /> },
          ].map((servicio, index) => (
            <View key={index} style={styles.serviceItem}>
              {servicio.icono}
              <Text style={styles.serviceText}>{servicio.nombre}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff7ed", padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1f2937" },
  subtitle: { fontSize: 15, color: "#4b5563", textAlign: "center", marginTop: 4 },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  counterText: { marginLeft: 8, fontWeight: "600", color: "#374151" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#1f2937", marginVertical: 10 },
  cardGrid: { gap: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderTopWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconBox: { padding: 10, borderRadius: 10 },
  discount: { fontWeight: "bold", color: "#374151" },
  cardTitle: { fontSize: 16, fontWeight: "600", marginVertical: 4 },
  cardText: { fontSize: 13, color: "#4b5563" },
  cardDate: { fontSize: 12, color: "#6b7280", marginVertical: 6 },
  button: {
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  progressCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginVertical: 6,
  },
  progressFill: { height: 6, borderRadius: 3 },
  progressInfo: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
  servicesSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginTop: 30,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  serviceItem: { alignItems: "center", marginVertical: 8, width: "30%" },
  serviceText: { marginTop: 4, fontSize: 13, color: "#374151", fontWeight: "500" },
});
