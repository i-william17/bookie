import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Button from "@/components/button/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyAccountScreen() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const handleSumbit = async () => {
    const otp = code.join("");
    const activation_token = await AsyncStorage.getItem("activation_token");

    await axios
      .post(`${SERVER_URI}/activate-user`, {
        activation_token,
        activation_code: otp,
      })
      .then((res: any) => {
        Toast.show("Your account activated successfully!", {
          type: "success",
        });
        setCode(new Array(4).fill(""));
        router.push("/(routes)/login");
      })
      .catch((error) => {
        Toast.show("Your OTP is not valid or expired!", {
          type: "danger",
        });
      });
  };

  return (
    <LinearGradient
      colors={["#6A11CB", "#2575FC"]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.headerText}>Enter Verification Code</Text>
        <Text style={styles.subText}>
          We have sent the verification code to your email address
        </Text>
        <View style={styles.inputContainer}>
          {code.map((_, index) => (
            <TextInput
              key={index}
              style={styles.inputBox}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInput(text, index)}
              value={code[index]}
              ref={inputs.current[index]}
              autoFocus={index === 0}
            />
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Submit" onPress={() => router.push("/(routes)/login")} />
        </View>
        <View style={styles.loginLink}>
          <Text style={styles.backText}>Back To?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontFamily: "Poppins_700Bold",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  inputBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    marginRight: 10,
    borderRadius: 15,
    fontSize: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginLink: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#3876EE",
    marginLeft: 5,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  backText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins_400Regular",
  },
});