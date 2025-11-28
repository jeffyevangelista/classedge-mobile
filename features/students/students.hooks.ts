import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getStudents } from "./students.apis";

export const useStudents = (courseId: string) => {
  return useInfiniteQuery({
    queryKey: ["course-students", courseId],
    queryFn: ({ pageParam = 1 }) => getStudents({ pageParam, courseId }),
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
