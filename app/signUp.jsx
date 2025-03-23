import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import "../global.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Entypo } from "@expo/vector-icons";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  const handleSignUp = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            Alert.alert(
              "Verification email sent",
              "Please check your email to verify your account."
            );
            reset();
            router.push("");
          })
          .catch((error) => {
            Alert.alert("Error sending verification email:", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Error creating user:", error.message);
      });
  };

  return (
    <View className="flex-1 items-center p-[12px] bg-slate-200 justify-center">
      <Image
        source={require("../assets/image22.png")}
        className="h-[12rem] w-[12rem] mb-[12px] rounded-full self-center"
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <TextInput
                className="bg-white p-[12px] rounded-[12px] border-[1px] border-gray-400 placeholder:text-gray-400 placeholder:text-[1.1rem]"
                placeholder="Enter your full name"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
              />
              {errors.name && (
                <Text className="text-red-500 mb-[0.5rem] text-center text-[10px]">
                  {errors.name.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <TextInput
                className="bg-white p-[12px] rounded-[12px] border-[1px] border-gray-400 placeholder:text-gray-400 placeholder:text-[1.1rem]"
                placeholder="Enter your email"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
              />
              {errors.email && (
                <Text className="text-red-500 text-center mb-[0.5rem] text-[10px]">
                  {errors.email.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <View className="relative flex-row">
                <TextInput
                  className="bg-white p-[12px] rounded-[12px] w-full border-[1px] border-gray-400 placeholder:text-gray-400 placeholder:text-[1.1rem]"
                  placeholder="Enter your new password"
                  value={value}
                  secureTextEntry={!showPassword}
                  onChangeText={handleInputChange(onChange)}
                  onBlur={onBlur}
                />
                <TouchableOpacity
                  className="absolute right-[1.4rem] top-[0.6rem]"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Entypo
                    name={showPassword ? "eye-with-line" : "eye"}
                    color="black"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 mb-[0.5rem] text-center text-[10px]">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <View className="relative flex-row">
                <TextInput
                  className="bg-white p-[12px] rounded-[12px] w-full border-[1px] border-gray-400 placeholder:text-gray-400 placeholder:text-[1.1rem]"
                  placeholder="Re-enter your password"
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleInputChange(onChange)}
                />
                <TouchableOpacity
                  className="absolute right-[1.4rem] top-[0.6rem]"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Entypo
                    name={showConfirmPassword ? "eye-with-line" : "eye"}
                    color="black"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text className="text-red-500 mb-[0.5rem] text-center text-[10px]">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSubmit(handleSignUp)}
        className="bg-[#d90429] w-full h-[40px] rounded-[12px] items-center justify-center"
      >
        <Text className="font-[700] text-[20px] text-white">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row gap-[6px] mt-[12px] justify-center">
        <Text className="text-[1.1rem]">If you already have an account?</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Text className="text-[#d90429] font-[700] text-[1.1rem]">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpPage;
