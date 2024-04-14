/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FromRow from "../../ui/FromRow";

import { useForm } from "react-hook-form";
// import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId); // this would keep a track of whether we are currently adding a new cabin or updating an existing cabin

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // if the form is used for editing, we have to prefill the form with the existing data
    defaultValues: isEditSession ? editValues : {},
  });

  // getValues fn helps to get the values submitted in the form in each field
  // formState is used to get the errors occured during the form submission
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  // 🔴 using react hook form
  // step 1: register all the fields that we want react hook form to handle
  // step 2 : specify onSubmit to the Form component

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // this fn would get the "data" from all the fields that we registered
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    // mutate({ ...data });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* the onError fn in called when there is an error submitting the form (for eg a validation error) */}
      <FromRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
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
            required: isEditSession ? false : "This field is required",
            // while editing a cabin it is not necesary to upload a new image, so the above expression is used
          })}
        />
      </FromRow>

      <FromRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FromRow>
    </Form>
  );
}

export default CreateCabinForm;
