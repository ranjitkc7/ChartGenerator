import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import "../global.css";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([{ facts: " ", definition: " " }]);

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { facts: " ", definition: " " }]);
  };

  return (
    <ScrollView className="flex-1 bg-[#edf2f4] p-[10px]">
      <View className="h-[30rem] w-full rounded-md p-[6px] relative bg-[#ffffff]">
        <View className="flex-row items-center gap-2 h-[3rem]">
          <Text className="font-bold text-[1.5rem] mt-[12px]">Title :</Text>
          <TextInput
            className="w-[15rem] border-b-[1px] h-full placeholder:text-[1.2rem] pl-[10px]"
            value={title}
            onChangeText={setTitle}
          />
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
                className="w-[50%] border-[1px] rounded-md  text-center"
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
          <TouchableOpacity className="mt-4">
            <Text
              className="text-[#d90429] text-[1rem] text-center cursor-pointer"
              onPress={addRow}
            >
              + Add Row
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            activeOpacity={0.7}
          className="bg-[#d90429] absolute bottom-3 right-3 w-[7rem] h-[2.5rem] 
        items-center justify-center rounded-md mt-[1rem] px-3"
        >
          <Text className="text-[#ffffff] text-[1.2rem] font-[600]">Generate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomePage;
