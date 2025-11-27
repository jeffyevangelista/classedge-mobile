import ErrorFallback from "@/components/error-fallback";
import NoDataFallback from "@/components/no-data-fallback";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { SkeletonText } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { useUserDetails } from "../profile.hooks";

const ProfileInformation = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useUserDetails();

  if (isLoading) return <LoadingComponent />;

  if (isError)
    return (
      <ErrorFallback
        error={error.message}
        refetch={refetch}
        isRefetching={isRefetching}
      />
    );

  if (!data)
    return <NoDataFallback refetch={refetch} isRefetching={isRefetching} />;

  return (
    <ScrollView className="px-5">
      <InFormationComponent
        label="Full Name"
        value={data.first_name + " " + data.last_name}
      />
      <InFormationComponent label="Phone Number" value={data.phone_number} />
      <InFormationComponent label="Date of Birth" value={data.date_of_birth} />
      <InFormationComponent label="Gender" value={data.gender} />
      <InFormationComponent label="Nationality" value={data.nationality} />
      <InFormationComponent label="Address" value={data.address} />
      <InFormationComponent label="Id number" value={data.id_number} />
      <InFormationComponent label="Year Level" value={data.year_level} />
      <InFormationComponent label="Course" value={data.course} />
      {data.role === "Teacher" && (
        <InFormationComponent label="Department" value={data.department} />
      )}
    </ScrollView>
  );
};

const InFormationComponent = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <Card className="mb-2.5 rounded-lg max-w-screen-md mx-auto w-full">
      <HStack className="justify-between items-center">
        <VStack>
          <Text className="text-sm text-typography-500">{label}</Text>
          <Text className="text-lg font-semibold text-justify">{value}</Text>
        </VStack>
      </HStack>
    </Card>
  );
};

const LoadingComponent = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Card
          key={index}
          className="mb-2.5 rounded-lg max-w-screen-md mx-auto w-full"
        >
          <HStack className="justify-between items-center">
            <VStack className=" flex-1" space={"sm"}>
              <SkeletonText speed={2} className="h-3 w-20 rounded-full" />
              <SkeletonText speed={4} className="h-5 w-full rounded-full" />
            </VStack>
          </HStack>
        </Card>
      ))}
    </>
  );
};

export default ProfileInformation;
