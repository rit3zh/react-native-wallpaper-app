import {
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { createTable, getWallpapers } from "@/db/DBFlow";
import { EmptyState, VerticalList } from "@/components";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

interface Wallpaper {
  id: number;
  url: string;
}

export const SaveScreen = (props: NativeStackHeaderProps) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const setupDB = async () => {
      await createTable();
      await fetchWallpapers();
    };
    setupDB();
  }, []);

  const fetchWallpapers = async () => {
    try {
      const wallpapers = await getWallpapers();
      setWallpapers(wallpapers);
    } catch (error) {
      console.error("Failed to fetch wallpapers:", error);
    }
  };

  const onReloadPress = async () => {
    setIsLoading(true);
    await fetchWallpapers().then(() => setIsLoading(false));
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="bg-black flex-1">
        <View className="items-end justify-center mr-5 mb-1">
          {isLoading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <TouchableWithoutFeedback onPress={onReloadPress}>
              <Ionicons name="refresh-sharp" size={24} color="white" />
            </TouchableWithoutFeedback>
          )}
        </View>

        {!wallpapers.length ? (
          <View className="items-center justify-center flex-1 bottom-10">
            <EmptyState
              icon={() => (
                <SimpleLineIcons
                  name="cloud-download"
                  size={24}
                  color="#8a8a8a"
                />
              )}
              title="Save Wallpapers"
              description={() => (
                <Text numberOfLines={2} className="text-white max-w-[250px]">
                  Begin saving your favorite wallpapers.
                </Text>
              )}
            />
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={wallpapers}
            numColumns={2}
            keyExtractor={(data) => data?.id.toString()}
            renderItem={({ item, index }) => (
              <VerticalList
                useSlideAnimation={false}
                onPress={(data) =>
                  props?.navigation.navigate("DetailStack", { ...data })
                }
                imageURL={item.url}
                index={index}
                length={wallpapers?.length}
              />
            )}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};
