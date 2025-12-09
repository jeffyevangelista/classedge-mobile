import { useImage } from "@/providers/ImageProvider";
import { useVideoPlayer, VideoView } from "expo-video";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { DocumentIcon, PhotoIcon } from "react-native-heroicons/outline";
import { PlayIcon } from "react-native-heroicons/solid";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { Icon, LinkIcon } from "./ui/icon";
const FileRenderer = ({ url }: { url: any }) => {
  const { lesson_file, lesson_url } = url;

  // Move hooks to component level
  const { showImage } = useImage();
  const [showVideo, setShowVideo] = useState(false);
  const player = useVideoPlayer(lesson_file || "", (player) => {
    player.loop = true;
  });

  const renderUrlLink = () => {
    if (!lesson_url) return null;

    return (
      <Pressable
        onPress={async () => {
          await WebBrowser.openBrowserAsync(lesson_url!);
        }}
      >
        <Card className="max-w-screen-md  flex-row items-center gap-2.5 mb-2.5">
          <Box className="p-2 rounded bg-primary-100">
            <Icon className="h-10 w-10 text-primary-600" as={LinkIcon} />
          </Box>
          <Box className="flex-1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="leading-tight"
            >
              {lesson_url}
            </Text>
          </Box>
        </Card>
      </Pressable>
    );
  };

  const renderFileContent = () => {
    if (!lesson_file) return null;

    const fileName = lesson_file.split("/").pop();
    const fileType = lesson_file.split(".").pop()?.toLowerCase();

    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
        return (
          <TouchableOpacity onPress={() => showImage(lesson_file)}>
            <Card className="max-w-screen-md flex-row items-center gap-2.5 mb-2.5">
              <Box className="p-2 rounded bg-teal-100">
                <Icon className="text-teal-600 h-10 w-10" as={PhotoIcon} />
              </Box>
              <Box className="flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ flexShrink: 1 }}
                >
                  {fileName}
                </Text>
              </Box>
            </Card>
          </TouchableOpacity>
        );
      case "mp4":
        return (
          <>
            <Pressable onPress={() => setShowVideo(!showVideo)}>
              <Card className="max-w-screen-md flex-row items-center gap-2.5 mb-2.5">
                <Box className="p-2 rounded bg-purple-100">
                  <Icon className="text-purple-600 h-10 w-10" as={PlayIcon} />
                </Box>
                <Box className="flex-1">
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {fileName}
                  </Text>
                </Box>
              </Card>
            </Pressable>
            {showVideo && (
              <Box className="w-full max-w-screen-md mx-auto mb-2.5">
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                  contentFit="contain"
                />
              </Box>
            )}
          </>
        );

      case "pdf":
        return (
          <Pressable
            onPress={async () => {
              await WebBrowser.openBrowserAsync(lesson_file);
            }}
          >
            <Card className="max-w-screen-md flex-row items-center gap-2.5 mb-2.5">
              <Box className="p-2 rounded bg-red-100">
                <Icon className="text-red-600 h-10 w-10" as={DocumentIcon} />
              </Box>
              <Box className="flex-1">
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {fileName}
                </Text>
              </Box>
            </Card>
          </Pressable>
        );

      default:
        return null;
    }
  };

  return (
    <Box className="gap-2">
      {renderUrlLink()}
      {renderFileContent()}
    </Box>
  );
};

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  video: {
    height: Math.min(screenWidth * 0.6, 430), // Responsive height with max limit
    aspectRatio: 16 / 9, // Standard video aspect ratio
    maxWidth: screenWidth * 0.9, // Responsive width with max limit
    marginHorizontal: "auto",
  },
});
export default FileRenderer;
