import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient(); // this would give access to the queryClient defined in App.jsx

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      // here we would tell react query what to do as soon as the mutation was successful
      // we want to refetch the data and that can be done by invalidating the cache (the stored data which has now been changed in the supabase and now needs to be refetched)
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  }); // this is used to mutate the state. eg. deleting the cabin

  return { isDeleting, deleteBooking };
}
