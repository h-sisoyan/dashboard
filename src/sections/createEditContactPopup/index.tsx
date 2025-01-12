import { useState, useCallback } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";

import { API_URL, POST, PUT } from "../../constants/api";
import useRequest from "../../hooks/useRequest";
import Popup from "../../components/popup";
import FormField from "../../components/formField";

const defaultValues = {
  email: "",
  username: "",
  fullName: "",
};

const Email = z.string().email();
const Username = z
  .string()
  .min(5, { message: "Must be 5 or more characters long" })
  .max(20, { message: "Must be 20 or fewer characters long" });
const FullName = z
  .string()
  .min(5, { message: "Must be 5 or more characters long" })
  .max(20, { message: "Must be 20 or fewer characters long" });

const CreateEditContactPopup = ({
  isOpen,
  userId,
  onClose,
  onSuccess,
  defaultFormValues,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  defaultFormValues: any;
  onSuccess: (user: object) => void;
}) => {
  const [error, setError] = useState("");

  const onError = useCallback(({ message }: { message: string }) => {
    setError(message);
  }, []);

  const { mutate: createContact } = useRequest({
    onError,
    onSuccess,
    method: !!userId ? PUT : POST,
  });

  const form = useForm({
    defaultValues: defaultFormValues || defaultValues,
    onSubmit: ({ value }) => {
      createContact({
        body: JSON.stringify(value),
        url: `${API_URL}${!!userId ? `/${userId}` : ""}`,
      });
    },
  });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className="justify-self-center text-xl font-bold">
          {!!userId ? "Edit the contact" : "Create new contact"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FormField
            form={form}
            name="username"
            label="Username"
            validationCallback={Username.parse}
          />
          <FormField
            form={form}
            name="fullName"
            label="Full Name"
            validationCallback={FullName.parse}
          />
          <FormField
            form={form}
            name="email"
            label="Email"
            validationCallback={Email.parse}
          />
          {!!error && <p>{error}</p>}
          <form.Subscribe
            selector={({ canSubmit, isSubmitting }) => [
              canSubmit,
              isSubmitting,
            ]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="justify-self-center block box-border border-2 border-blue-400 rounded-md p-1 text-blue-500 m-2"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          />
        </form>
      </div>
    </Popup>
  );
};

export default CreateEditContactPopup;
