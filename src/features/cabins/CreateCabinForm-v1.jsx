/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FromRow from "../../ui/FromRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  // getValues fn helps to get the values submitted in the form in each field
  // formState is used to get the errors occured during the form submission
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // resets the form (empties all the fields)
    },
    onError: (err) => toast.error(err.message),
  });
  // 🔴 using react hook form
  // step 1: register all the fields that we want react hook form to handle
  // step 2 : specify onSubmit to the Form component

  function onSubmit(data) {
    // this fn would get the "data" from all the fields that we registered
    mutate({ ...data, image: data.image[0] });
    // mutate({ ...data });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* the onError fn in called when there is an error submitting the form (for eg a validation error) */}
      <FromRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
            // this is used for validation purpose
          })}
        />
      </FromRow>

      <FromRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
              // these are  all the validations
            },
          })}
        />
        {/* registering the field this way would add some props to the corresponding input function */}
      </FromRow>

      <FromRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FromRow>

      <FromRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              //  this is a custom validation fn
              // value is the current value being input in the field
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FromRow>

      <FromRow
        label="Description for website"
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FromRow>

      <FromRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FromRow>

      <FromRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FromRow>
    </Form>
  );
}

export default CreateCabinForm;
