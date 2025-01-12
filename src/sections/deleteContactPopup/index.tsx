import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import { DASHBOARD } from "../../constants/paths";
import { API_URL, DELETE, SUCCESS } from "../../constants/api";
import Popup from "../../components/popup";
import useRequest from "../../hooks/useRequest";

const DeleteContactPopup = ({
  isOpen,
  userId,
  onClose,
  refetch,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const navigate = useNavigate();

  const onDeleteSuccess = useCallback(async () => {
    const { data, status } = await refetch() as any;

    if (status === SUCCESS) {
      navigate({
        state: { userId: data[0].id },
        to: `/${DASHBOARD}/${data[0].username}`,
      } as any);
    }

    onClose();

    alert("Contact successfully deleted");
  }, []);

  const onDeleteError = useCallback(async () => {
    alert("Something went wrong");
  }, []);

  const { mutate: deleteContact } = useRequest({
    method: DELETE,
    onError: onDeleteError,
    onSuccess: onDeleteSuccess,
  });

  const handleDeleteContact = useCallback(() => {
    deleteContact({ url: `${API_URL}/${userId}` } as any);
  }, [deleteContact, onClose]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <h3 className="justify-self-center text-xl font-bold">
          Delete Contact
        </h3>
        <p>Are you sure you want to delete?</p>
        <div className="flex flex-row justify-center">
          <button
            onClick={handleDeleteContact}
            className="box-border border-2 border-red-400 rounded-md p-1 text-red-500 m-2"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="box-border border-2 border-blue-400 rounded-md p-1 text-blue-500 m-2"
          >
            No
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default DeleteContactPopup;
