import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // removes the query from the cache otherwise even after logging out, it would be there in the cache

      navigate("/login", { replace: true }); // using replace:true we erase the place we were at earlier
    },
  });

  return { logout, isLoading };
}
