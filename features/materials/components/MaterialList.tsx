import { Link, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useMaterials } from "../materials.hooks";

const MaterialList = () => {
  const { id } = useGlobalSearchParams();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMaterials(id as string);

  if (isLoading && !data) return <ActivityIndicator />;
  if (isError) return <Text>{error.message}</Text>;

  const materials = data?.pages.flatMap((page) => page.results) ?? [];

  if (!isLoading && materials.length === 0)
    return <Text>No materials found.</Text>;

  return (
    <FlatList
      data={materials}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={`/material/${item.id}`} asChild>
          <Text>{item.lesson_name}</Text>
        </Link>
      )}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MaterialList;
