import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/task";
import { reorder } from "./reorder";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, pastData: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (pastData?: any[]) =>
        callback(target, pastData || [])
      );
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, pastData) =>
    pastData.filter((item) => item.id !== target.id)
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, pastData) =>
    pastData.map((item) =>
      item.id === target.id ? { ...item, ...target } : item
    )
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, pastData) =>
    pastData ? [...pastData, target] : []
  );

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, pastData) =>
    reorder({ list: pastData, ...target })
  );

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, pastData) => {
    const orderedList = reorder({ list: pastData, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
