import { useMutation } from "@tanstack/react-query";

const useRequest = ({
  method,
  onError,
  onSuccess,
}: {
  method: string;
  onError: (error: any) => void;
  onSuccess: (user: object) => void;
}) => {
  const mutation = useMutation({
    onError,
    onSuccess,
    mutationFn: async ({ url, body }: { url: string; body: any }) => {
      const result = await fetch(url, { method, ...(body && { body }) });
      const resultJson = await result.json();

      return resultJson;
    },
  });

  return mutation;
};

export default useRequest;
