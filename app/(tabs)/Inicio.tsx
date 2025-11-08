import React from "react";
import { ScrollView } from "react-native";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";

const Home: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeroSection />
      <Features />
    </ScrollView>
  );
};

export default Home;
