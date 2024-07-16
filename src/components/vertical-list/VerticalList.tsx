import { View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { ISearch } from "pinterest.js";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from "react-native-reanimated";

interface Props extends ISearch {
  length?: number;
  index?: number;
  onPress?: (data: ISearch) => any | void;
  bottomPadding?: string;
  useSlideAnimation?: boolean;
}

export const VerticalList: React.FC<Props> = ({
  ...props
}: Props): React.ReactNode & React.JSX.Element => {
  const propsOptions = {
    date: props.date,
    id: props.id,
    imageURL: props.imageURL,
    pinner: props.pinner,
    title: props.title,
    type: props.type,
    video: props.video,
  };

  const enteringAnimation =
    props?.index! % 2 === 0
      ? FadeInUp.delay(props?.index! * 200)
      : FadeInDown.delay(props?.index! * 200);

  return (
    <TouchableHighlight onPress={() => props?.onPress!(propsOptions)}>
      <Animated.View
        entering={
          props?.useSlideAnimation
            ? enteringAnimation
            : FadeIn.springify().delay(500)
        }
        className={`${
          props?.length! - 1 === props?.index
            ? `${props?.bottomPadding ? props?.bottomPadding : "mb-10"}`
            : "mb-0"
        } items-center`}
      >
        <Animated.Image
          source={{ uri: props?.imageURL }}
          className="w-[190] h-72 m-3 items-center justify-center rounded-[12px]"
        />
      </Animated.View>
    </TouchableHighlight>
  );
};
