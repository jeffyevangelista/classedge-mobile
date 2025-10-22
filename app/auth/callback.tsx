import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // The OAuth flow will handle the redirect automatically
    // This component just prevents the "unmatched route" error
    // After auth completes, navigate to the main app
    const timer = setTimeout(() => {
      router.replace("/(main)/(tabs)");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
