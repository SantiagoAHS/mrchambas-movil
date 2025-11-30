import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width * 0.65; // ← mucho más pequeño para probar

const images = [
  require("@/assets/images/floreria.jpg"),
  require("@/assets/images/fiesta.jpg"),
  require("@/assets/images/medico.jpg"),
  require("@/assets/images/contruccion.jpg"),
];

const ImageCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={next} activeOpacity={0.8}>
        <Image 
          source={images[index]} 
          style={styles.image} 
          resizeMode="cover" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "transparent", // ← IMPORTANTÍSIMO para evitar fondo negro
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE, // cuadrado
    borderRadius: 16,
    backgroundColor: "transparent", // ← evita cualquier fondo por defecto
  },
});

export default ImageCarousel;
