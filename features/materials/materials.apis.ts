import api from "@/lib/axios";
import { MaterialType } from "./materials.types";

export const getMaterials = async ({
  pageParam = 1,
  courseId,
}: {
  pageParam: number;
  courseId: string;
}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: MaterialType[];
}> => {
  return (await api.get(`/subjects/${courseId}/lessons/?page=${pageParam}`))
    .data;
};

export const getMaterial = async (id: string): Promise<MaterialType> => {
  return (await api.get(`/lessons/${id}/`)).data;
};
