import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
interface Props {
  title: string;
  description: () => React.ReactNode & JSX.Element;
  icon?: () => React.ReactNode & JSX.Element;
  titleSize?: number;
}

export const EmptyState: React.FC<Props> = ({
  title,
  description,
  icon,
  titleSize = 18,
}: Props): React.JSX.Element & React.ReactNode => {
  const TEXT_LENGTH: number = 34;
  const chunkedTitle = splitText(title, TEXT_LENGTH);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>{icon!()}</View>

        <View className="flex-col items-start ml-4 p-2">
          <View className="pb-1">
            {title.length > TEXT_LENGTH ? (
              chunkedTitle.map((value, index) => (
                <View key={`${index}_`} style={styles.chunkedTitleContainer}>
                  <Text
                    numberOfLines={2}
                    style={[styles.title, { fontSize: titleSize }]}
                  >
                    {value}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                numberOfLines={2}
                style={[styles.title, { fontSize: titleSize }]}
              >
                {title}
              </Text>
            )}
          </View>

          <View style={styles.descriptionContainer}>{description()}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: responsiveHeight(25),
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  titleContainer: {
    // paddingTop: 20,
  },
  title: {
    color: "#a6a6a6",
    maxWidth: 290,
  },
  descriptionContainer: {
    // padding: 15.3,
  },
  chunkedTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 5.4,
  },
});

export function splitText(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  let lastSpaceIndex = text.substring(0, maxLength).lastIndexOf(" ");
  let firstHalf = text.substring(0, lastSpaceIndex);
  let secondHalf = text.substring(lastSpaceIndex + 1);

  return [firstHalf, secondHalf];
}
