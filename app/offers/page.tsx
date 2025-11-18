"use client";

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
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
      descripcion: "Descuento para nuevos clientes",
      icono: <Gift color="#fff" size={22} />,
      color: "#ef4444",
      fechaExpiracion: "31 Dic 2024",
    },
    {
      id: "2",
      titulo: "Plomería Express",
      descuento: "15%",
      descripcion: "Plomería de emergencia",
      icono: <Wrench color="#fff" size={22} />,
      color: "#f97316",
      fechaExpiracion: "15 Ene 2025",
    },
    {
      id: "3",
      titulo: "Jardín Perfecto",
      descuento: "25%",
      descripcion: "Jardinería y paisajismo",
      icono: <Scissors color="#fff" size={22} />,
      color: "#f59e0b",
      fechaExpiracion: "28 Feb 2025",
    },
  ];

  const cuponesProgreso = [
    {
      id: "p1",
      titulo: "Cliente Fiel",
      descuento: "30%",
      descripcion: "Después de 4 servicios completados",
      icono: <Star color="#fff" size={22} />,
      color: "#ea580c",
      req: 4,
      act: 6,
      recompensa: "30% OFF en tu próximo servicio",
    },
    {
      id: "p2",
      titulo: "Experto en Casa",
      descuento: "40%",
      descripcion: "Después de 8 servicios",
      icono: <Home color="#fff" size={22} />,
      color: "#ef4444",
      req: 8,
      act: 6,
      recompensa: "40% + limpieza gratis",
    },
  ];

  const progressPercent = (a: number, r: number) => Math.min((a / r) * 100, 100);

  return (
    <ScrollView style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Ofertas y Cupones</Text>
        <Text style={styles.subtitle}>Gana recompensas usando nuestros servicios</Text>

        <View style={styles.counter}>
          <Target color="#ef4444" size={18} />
          <Text style={styles.counterText}>Servicios completados: {serviciosCompletados}</Text>
        </View>
      </View>

      {/* CUPONES DISPONIBLES */}
      <Text style={styles.sectionTitle}>🎁 Cupones Disponibles</Text>

      <View style={styles.cardGrid}>
        {cuponesDisponibles.map((cupon) => (
          <View key={cupon.id} style={[styles.card, { borderLeftColor: cupon.color }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: cupon.color }]}>
                {cupon.icono}
              </View>
              <Text style={styles.discount}>{cupon.descuento} OFF</Text>
            </View>

            <Text style={styles.cardTitle}>{cupon.titulo}</Text>
            <Text style={styles.cardText}>{cupon.descripcion}</Text>
            <Text style={styles.cardDate}>Válido hasta: {cupon.fechaExpiracion}</Text>

            <TouchableOpacity style={[styles.button, { backgroundColor: cupon.color }]}>
              <Text style={styles.buttonText}>Usar Cupón</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CUPONES POR DESBLOQUEAR */}
      <Text style={styles.sectionTitle}>🏆 Cupones por Desbloquear</Text>

      {cuponesProgreso.map((c) => {
        const progreso = progressPercent(c.act, c.req);
        const listo = c.act >= c.req;

        return (
          <View
            key={c.id}
            style={[
              styles.progressCard,
              listo && { borderColor: "#ef4444", borderWidth: 2 },
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: c.color }]}>{c.icono}</View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{c.titulo}</Text>
              <Text style={styles.cardText}>{c.descripcion}</Text>

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progreso}%`, backgroundColor: c.color }]} />
              </View>

              <Text style={styles.progressInfo}>
                {listo ? `🎉 ${c.recompensa}` : `Faltan ${c.req - c.act} servicios`}
              </Text>

              <TouchableOpacity
                disabled={!listo}
                style={[
                  styles.button,
                  { backgroundColor: listo ? c.color : "#9ca3af" },
                ]}
              >
                <Text style={styles.buttonText}>
                  {listo ? "Reclamar Cupón" : `${Math.round(progreso)}% completado`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* SERVICIOS */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>🧰 Nuestros Servicios</Text>

        <View style={styles.serviceGrid}>
          {[
            { nombre: "Plomería", icono: <Wrench color="#ef4444" size={22} /> },
            { nombre: "Jardinería", icono: <Scissors color="#ea580c" size={22} /> },
            { nombre: "Electricidad", icono: <Zap color="#f97316" size={22} /> },
            { nombre: "Pintura", icono: <Paintbrush color="#f59e0b" size={22} /> },
            { nombre: "Limpieza", icono: <Home color="#ef4444" size={22} /> },
            { nombre: "Mecánica", icono: <Car color="#78350f" size={22} /> },
          ].map((s, i) => (
            <View key={i} style={styles.serviceItem}>
              {s.icono}
              <Text style={styles.serviceText}>{s.nombre}</Text>
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
  title: { fontSize: 26, fontWeight: "bold", color: "#1f2937" },
  subtitle: { fontSize: 14, color: "#4b5563", marginTop: 4, textAlign: "center" },

  counter: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginTop: 10,
    elevation: 2,
  },
  counterText: { marginLeft: 8, color: "#374151", fontWeight: "600" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginVertical: 14,
  },

  /* Cupones */
  cardGrid: { gap: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  iconBox: { padding: 12, borderRadius: 12 },
  discount: { fontWeight: "bold", color: "#374151", fontSize: 15 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginTop: 6 },
  cardText: { fontSize: 13, color: "#4b5563", marginTop: 2 },
  cardDate: { fontSize: 12, color: "#6b7280", marginVertical: 6 },

  button: {
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },

  /* Progreso */
  progressCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 2,
  },
  progressBar: {
    width: "100%",
    height: 7,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginVertical: 8,
  },
  progressFill: { height: 7, borderRadius: 10 },
  progressInfo: { fontSize: 12, color: "#6b7280", marginBottom: 6 },

  /* Servicios */
  servicesSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  serviceItem: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 10,
  },
  serviceText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 6,
  },
});
