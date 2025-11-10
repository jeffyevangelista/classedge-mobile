import { Link, useGlobalSearchParams } from "expo-router";
import { FlatList, Text } from "react-native";
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

  if (isLoading) return <Text>loading...</Text>;
  if (isError) return <Text>{error.message}</Text>;

  const materials = data?.pages.flatMap((page) => page.results) ?? [];
  const showLoadingData = isLoading || (isError && data);

  return (
    <FlatList
      data={showLoadingData ? [] : materials}
      renderItem={({ item }) => (
        <Link href={`/material/${item.id}`}>
          <Text>{item.lesson_name}</Text>
        </Link>
      )}
      ListFooterComponent={
        showLoadingData || isFetchingNextPage ? <Text>loading...</Text> : null
      }
      refreshing={isRefetching}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MaterialList;
