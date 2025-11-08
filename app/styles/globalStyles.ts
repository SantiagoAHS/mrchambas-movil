// app/styles/globalStyles.ts
import { StyleSheet } from "react-native";

export const colors = {
  red: "#ef4444",
  green: "#22c55e",
  darkBg: "#121212",
  lightBg: "#f9fafb",
  cardDark: "#2a2a2a",
  cardLight: "#fff",
  textLight: "#fff",
  textDark: "#111",
  inputDark: "#3a3a3a",
  inputLight: "#fff",
};

export const globalStyles = StyleSheet.create({
  // Secciones generales
  section: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },

  // Hero Section
  heroGradient: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heroContainer: {
    alignItems: "center",
    textAlign: "center",
    maxWidth: 800,
    width: "90%",
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  heroDescription: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: "center",
  },
  heroButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  heroButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },

  // Inputs y botones comunes
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },
  linkText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export const authStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    textAlign: "center",
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 12,
  },
});

export const heroStyles = StyleSheet.create({
  gradientBackground: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    textAlign: "center",
    maxWidth: 800,
    width: "90%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },
});
