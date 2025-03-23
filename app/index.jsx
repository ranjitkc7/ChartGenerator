import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import "../global.css";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          Alert.alert("Logged in successfully!");
          router.push("/(chart)");
          setEmail("");
          setPassword("");
        } else {
          setError("Please verify your email before logging in.");
          Alert.alert("Please verify your email before logging in.");
        }
      }).catch((error) => {
        Alert.alert("Error logging in:", error.message);
      })
  }
  return (
    <View className="flex-1 p-[12px] bg-[#edf2f4] itesm-center 
    justify-center">
      <Image
        source={require("../assets/image1r.png")}
        className="h-[14rem] w-[14rem] rounded-full self-center"
      />
      <TextInput
        className="bg-white p-[12px] rounded-[12px] my-[12px] border-[1px]
       border-gray-400 placeholder:text-gray-400 placeholder:text-[1.1rem]"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <View className="flex-row relative w-full">
        <TextInput
          className="bg-white p-[12px] rounded-[12px] mb-[12px] w-full  border-[1px]
       border-gray-400   placeholder:text-gray-400 placeholder:text-[1.1rem]"
          placeholder="Enter your password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)} className='absolute right-[12px] top-[12px]'>
          <Entypo
            name={showPassword ? "eye-with-line" : "eye"}
            color="black"
            size={25}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.7}
        className="bg-[#d90429] w-full h-[40px] rounded-[12px] 
        items-center justify-center"
      >
        <Text className="text-[20px] text-white font-[700]">Login</Text>
      </TouchableOpacity>
      <View className="flex-row gap-[6px] mt-[12px] justify-center">
        <Text className="text-[1.1rem]">If you Don't have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("signUp")}
        >
          <Text className="text-[#d90429] font-[700] text-[1.1rem]">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
