import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

interface FadeInUpProps {
  visible: boolean;
  children: React.ReactNode;
}

export const FadeInUp: React.FC<FadeInUpProps> = ({ visible, children }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 30,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, translateY]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};
