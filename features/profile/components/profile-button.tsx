import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Pressable } from "@/components/ui/pressable";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserDetails } from "@/features/profile/profile.hooks";
import { useRouter } from "expo-router";

const ProfileButton = ({ color }: { color: string | undefined }) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useUserDetails();

  if (isLoading) {
    return <Skeleton speed={4} className="mr-3 rounded-full h-12 w-12" />;
  }
  return (
    <Pressable
      onPress={() => {
        router.push("/profile");
      }}
    >
      <Avatar className="h-11 w-11 mr-3 border-2 border-primary-600">
        <AvatarFallbackText>
          {data?.first_name + " " + data?.last_name}
        </AvatarFallbackText>
        <AvatarImage
          source={{
            uri: data?.photo,
          }}
        />
      </Avatar>
    </Pressable>
  );
};

export default ProfileButton;
