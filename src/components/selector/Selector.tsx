import { FlatList } from "react-native";
import React, { useState } from "react";
import type { Props } from "./types";
import { uuid } from "@/common/uuid";
import RenderItem from "./RenderItem";

export const Selector: React.FC<Props> = ({ ...props }: Props) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const handlePress = (name: string) => {
    setSelectedName(name);
    props?.onPress!(name, selectedName!);
  };
  return (
    <FlatList
      horizontal
      scrollEnabled={true}
      data={props.data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <>
          <RenderItem
            isSelected={item.name === selectedName}
            onPress={handlePress}
            name={item.name}
          />
        </>
      )}
    />
  );
};
