import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

interface CategoryProps {
  name: string;
}

interface Props {
  onPress: (name: string, selectedName?: string) => any | void;
  isSelected: boolean;
}

const RenderItem: React.FC<CategoryProps & Props> = ({
  name,
  onPress,
  isSelected,
}: CategoryProps & Props) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isSelected ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  const backgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1e1e1e", "pink"],
  });

  return (
    <TouchableOpacity onPress={() => onPress(name)}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.text}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 88,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});

export default RenderItem;
