import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export const downloadImage = async (url: string): Promise<void> => {
  try {
    const fileUri = FileSystem.documentDirectory + "image.png";

    const { uri } = await FileSystem.downloadAsync(url, fileUri);

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Downloaded",
      textBody: "Successfully downloaded the wallpaper!",
      titleStyle: {
        fontSize: 15,
      },
      autoClose: true,
    });
  } catch (error) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Failed Downloading",
      textBody:
        "Unable to download the image, please try again some time later.",
      titleStyle: {
        fontSize: 15,
      },
      autoClose: true,
    });
  }
};
