import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ThemeContext } from '@react-navigation/native';

export default function OnBoardingScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation
  const slideAnim = useRef(new Animated.Value(100)).current; // For slide-up animation

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide-up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ colors: { background: "#E5ECF9" } }}>
      <LinearGradient
        colors={["#E5ECF9", "#F6F7F9"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.firstContainer}>
          {/* Logo and Image */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
            <Image source={require("@/assets/images/image1.png")} style={styles.heroImage} />
          </Animated.View>

          {/* Title Section */}
          <Animated.View
            style={[
              styles.titleWrapper,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <Image
              style={styles.titleTextShape1}
              source={require("@/assets/images/image2.png")}
            />
            <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
              Start Learning With
            </Text>
            <Image
              style={styles.titleTextShape2}
              source={require("@/assets/images/image3.png")}
            />
          </Animated.View>

          {/* Subtitle Section */}
          <Animated.View
            style={[
              styles.subtitleWrapper,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <Image
              style={styles.titleShape3}
              source={require("@/assets/images/image4.png")}
            />
            <Text style={[styles.subtitleText, { fontFamily: "Raleway_700Bold" }]}>
              This is Bookie
            </Text>
          </Animated.View>

          {/* Description Section */}
          <Animated.View
            style={[
              styles.dscpWrapper,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
              Explore a variety of interactive lessons,
            </Text>
            <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
              videos, quizzes & assignments.
            </Text>
          </Animated.View>

          {/* Button Section */}
          <Animated.View
            style={[
              styles.buttonContainer,
              { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => router.push("/(routes)/welcome-intro/index")}
            >
              <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
                Getting Started
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  heroImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    color: "#2E3A59",
    textAlign: "center",
    marginVertical: 10,
  },
  titleTextShape1: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    left: -20,
    top: -10,
  },
  titleTextShape2: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    right: -20,
    bottom: -10,
  },
  subtitleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 24,
    color: "#2E3A59",
    textAlign: "center",
  },
  titleShape3: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
  dscpWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  dscpText: {
    fontSize: 16,
    color: "#6C7A92",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonWrapper: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});