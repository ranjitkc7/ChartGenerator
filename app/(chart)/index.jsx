import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import "../../global.css";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([{ facts: "", definition: "" }]);
  const [chartData, setChartData] = useState([]);
  const router = useRouter();
  const barColors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#fbbf24",
    "#8b5cf6",
    "#ec4899",
  ];
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { facts: "", definition: "" }]);
  };

  const generateChart = async () => {
    const data = rows
      .filter((row) => row.facts && row.definition)
      .map((row) => ({
        label: row.facts,
        value: parseFloat(row.definition),
      }));
    setChartData(data);

    try {
      const docRef = await addDoc(collection(db, "charts"), {
        title: title || "New Chart",
        data: data,
        timestamp: new Date().toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success!","Chart data saved created successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Failed ", "Failed to save chart data.");
    }
  };

  const chartWidth = 300;
  const chartHeight = 200;
  const barWidth = 40;
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <ScrollView className="flex-1 bg-[#edf2f4] p-[10px]">
      <View className="h-[30rem] w-full rounded-md p-[6px] relative bg-[#ffffff]">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-[1.5rem] mt-[12px]">Title :</Text>
          <TextInput
            className="w-[15rem] border-b-[1px] h-full placeholder:text-[1.2rem] pl-[10px]"
            value={title}
            onChangeText={setTitle}
          />
          <TouchableOpacity style={{
            position: "absolute", right: 0,
            height: 45, width: 45, justifyContent: "center",
            alignItems: "center", backgroundColor: "#ef4444", borderRadius: 50
          }}
            onPress={() => router.back()}
          >
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="mt-[1rem] px-4">
          <View className="border-b-[1px] mb-2">
            <View className="flex-row mb-2">
              <Text className="font-bold text-[1rem] w-[50%] text-center">
                Facts
              </Text>
              <Text className="font-bold text-[1rem] w-[50%] text-center">
                Description
              </Text>
            </View>
          </View>

          {rows.map((row, index) => (
            <View key={index} className="flex-row gap-2 mb-2">
              <TextInput
                className="w-[50%] border-[1px] rounded-md text-center"
                value={row.facts}
                onChangeText={(text) => handleRowChange(index, "facts", text)}
              />
              <TextInput
                className="w-[50%] border-[1px] rounded-md text-center"
                value={row.definition}
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleRowChange(index, "definition", text)
                }
              />
            </View>
          ))}

          <TouchableOpacity className="mt-4" onPress={addRow}>
            <Text className="text-[#d90429] text-[1rem] text-center cursor-pointer">
              + Add More Data
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={generateChart}
          activeOpacity={0.7}
          className="bg-[#d90429] absolute bottom-3 right-3 w-[7rem] h-[2.5rem] items-center justify-center rounded-md mt-[1rem] px-3"
        >
          <Text className="text-[#ffffff] text-[1.2rem] font-[600]">
            Generate
          </Text>
        </TouchableOpacity>
      </View>

      {chartData.length > 0 && (
        <View className="mt-4 items-center">
          <Text className="text-xl font-bold mb-4">{title}</Text>
          <Svg
            width={chartWidth}
            height={chartHeight}
            className="bg-gray-200 rounded-lg"
          >
            {chartData.map((data, index) => {
              const barHeight = (data.value / maxValue) * (chartHeight - 40);
              return (
                <Rect className="bg-slate-400"
                  key={`bar-${index}`}
                  x={index * (barWidth + 10) + 20}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill={barColors[index % barColors.length]}
                />
              );
            })}

            {chartData.map((data, index) => {
              const barHeight = (data.value / maxValue) * (chartHeight - 40);
              return (
                <SvgText
                  key={`value-${index}`}
                  x={index * (barWidth + 10) + 20 + barWidth / 2}
                  y={chartHeight - barHeight - 5}
                  fontSize={13}
                  fontWeight={600}
                  textAnchor="middle"
                  fill="black"
                >
                  {data.value}
                </SvgText>
              );
            })}
          </Svg>
          <View className="mt-[1rem] justify-center items-start mb-[2rem]">
            {chartData.map((data, index) => {
              return (
                <View
                  key={`legend-${index}`}
                  className="flex-row items-center mr-4 mb-2"
                >
                  <View
                    className="w-[1rem] h-[1rem] rounded-md mr-2"
                    style={{
                      backgroundColor: barColors[index % barColors.length],
                    }}
                  />
                  <Text className="text-sm font-bold">{data.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HomePage;
