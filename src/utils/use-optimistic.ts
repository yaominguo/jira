import { QueryKey, useQueryClient } from "react-query";

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
