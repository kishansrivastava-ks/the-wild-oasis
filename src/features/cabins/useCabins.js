import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], // this would be the unique key to identify the query
    queryFn: getCabins, // this fn is responsible for querying
  });

  return { isLoading, error, cabins };
}
