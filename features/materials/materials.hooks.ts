import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getMaterial, getMaterials } from "./materials.apis";

export const useMaterials = (courseId: string) => {
  return useInfiniteQuery({
    queryKey: ["course-materials", courseId],
    queryFn: ({ pageParam = 1 }) => getMaterials({ pageParam, courseId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page ? parseInt(page, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    enabled: !!courseId,
  });
};

export const useMaterial = (id: string) => {
  return useQuery({
    queryKey: ["course-material", id],
    queryFn: () => getMaterial(id),
  });
};
