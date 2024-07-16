import {
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useQuerySearch } from "@/hooks";
import { HOME_QUERY } from "@/constants/index";
import { Selector, VerticalList } from "@/components";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Animated, { FadeIn } from "react-native-reanimated";
import { ISearch, searchPins } from "pinterest.js";

export const HomeScreen = (props?: NativeStackHeaderProps) => {
  const response = useQuerySearch(HOME_QUERY);
  const [data, setData] = useState<ISearch[]>(response!);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onPress = async (name: string, selectedName: string) => {
    if (name === selectedName) return;
    setIsLoading(true);
    const result = await searchPins(`${name} mobile wallpapers`);
    setData(result?.response!);
    setIsLoading(false);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="bg-black flex-1">
        <View className="mb-3">
          <Selector
            onPress={onPress}
            data={[
              { name: "Nature" },
              { name: "Aesthetic" },
              { name: "Abstract" },
              { name: "Dark Academia" },
            ]}
          />
        </View>
        <View className="flex-1">
          {isLoading ? (
            <>
              <View className="items-center justify-center top-40">
                <ActivityIndicator size={"small"} />
              </View>
            </>
          ) : (
            <Animated.FlatList
              entering={FadeIn.springify()}
              scrollEnabled={false}
              data={!data?.length ? response : data}
              numColumns={2}
              keyExtractor={(data) => data?.id!}
              renderItem={({ item, index }) => (
                <VerticalList
                  useSlideAnimation
                  onPress={(data) =>
                    props?.navigation.navigate("DetailStack", { ...data })
                  }
                  bottomPadding="mb-20"
                  {...item}
                  index={index}
                  length={!data?.length ? response?.length : data.length}
                />
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
