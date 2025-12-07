// app/taps/Inicio.tsx
import React from "react";
import { ScrollView } from "react-native";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";
import ImageCarousel from "@/components/layout/ImageCarousel";

const Home: React.FC = () => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#ffffff" }} // ← FIX REAL
      contentContainerStyle={{ backgroundColor: "#ffffff" }} // ← FIX EXTRA
    >
      <HeroSection />
      <ImageCarousel />
      <Features />
    </ScrollView>
  );
};

export default Home;
