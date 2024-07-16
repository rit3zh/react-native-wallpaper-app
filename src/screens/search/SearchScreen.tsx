import {
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { EmptyState, VerticalList } from "@/components";
import { ISearch, searchPins } from "pinterest.js";
import { Entypo, Ionicons } from "@expo/vector-icons";

export const SearchScreen = (props: NativeStackHeaderProps) => {
  const [text, setText] = useState<string>("");
  const [bookmark, setBookmark] = useState<string>("");
  const [response, setResponse] = useState<ISearch[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [bottomLoader, setBottomLoader] = useState<boolean>(false);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: async (changedText) => {
          setText(changedText.nativeEvent.text);

          setLoading(true);
          const search = await searchPins(
            changedText.nativeEvent.text + "wallpaper",
            {
              limit: 20,
            }
          );
          setBookmark(search?.bookmark!);
          setResponse(search.response);
          setLoading(false);
        },
      },
    });
  }, [props.navigation]);
  const onMorePress = async () => {
    setBottomLoader(true);
    const search = await searchPins(text + "wallpaper", {
      limit: 20,
      bookmark,
    });
    setBookmark(search?.bookmark!);
    setResponse((previousResponse) => [
      ...previousResponse!,
      ...search?.response!,
    ]);
    setBottomLoader(false);
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="bg-black flex-1">
        {loading ? (
          <View className="items-center justify-center flex-1 bottom-10">
            <ActivityIndicator size={"small"} />
          </View>
        ) : (
          <React.Fragment>
            {!response?.length ? (
              <View className="items-center justify-center flex-1 bottom-10">
                <EmptyState
                  title="Wallpaper Search"
                  description={() => (
                    <Text className="text-white">
                      Start finding stunning wallpapers.
                    </Text>
                  )}
                  icon={() => (
                    <Ionicons name="image" size={24} color="#8a8a8a" />
                  )}
                />
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={response}
                numColumns={2}
                keyExtractor={(data) => data?.id!}
                renderItem={({ item, index }) => (
                  <VerticalList
                    useSlideAnimation={false}
                    onPress={(data) =>
                      props?.navigation.navigate("DetailStack", { ...data })
                    }
                    {...item}
                    index={index}
                    length={response?.length}
                  />
                )}
              />
            )}

            {bottomLoader ? (
              <ActivityIndicator
                size={"small"}
                className="mb-20 items-center"
              />
            ) : response?.length ? (
              <TouchableHighlight
                className="mb-20 items-center"
                onPress={onMorePress}
              >
                <Text className="text-white">Load more?</Text>
              </TouchableHighlight>
            ) : null}
          </React.Fragment>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};
