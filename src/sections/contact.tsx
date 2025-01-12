import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import avatar from "../assets/avatar.png";
import { DASHBOARD } from "../constants/paths.ts";
import { API_URL, SUCCESS } from "../constants/api";
import useCachedFetch from "../hooks/useCachedFetch.ts";
import DeleteContactPopup from "./deleteContactPopup.tsx";
import CreateEditContactPopup from "./createEditContactPopup";

const Contact = ({ refetch }: { refetch: () => void }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const {
    state: { userId },
  } = useLocation() as { state: any };

  const navigate = useNavigate();

  const { data, error, isPending } = useCachedFetch({
    dataKey: `user${userId}`,
    url: `${API_URL}/${userId}`,
  });

  const handleEditSucess = useCallback(async ({ id: userId }: any) => {
    setIsEditPopupOpen(false);

    const { data, status } = await refetch() as any;

    if (status === SUCCESS) {
      const { id, username } =
        data.find(({ id }: { id: number }) => id === userId) || data[0];

      navigate({ to: `/${DASHBOARD}/${username}`, state: { userId: id } as any });
    }

    alert("Contact successfully edited!");
  }, []);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  const { name, email, username } = data;

  const defaultFormValues = {
    email,
    username,
    fullName: name,
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="m-1 w-60 h-80">
          <img src={avatar} alt="avatar" />
          {/*jsonplaceholder doesn't have avatars, so I'm using a placeholder */}
        </div>
        <div className="m-12">
          <h3 className="font-bold">{name}</h3>
          <h2 className="text-blue-500">{username}</h2>
          <p>{email}</p>
          <button
            onClick={() => setIsEditPopupOpen(true)}
            className="box-border border-2 border-blue-400 rounded-md p-1 text-blue-500 m-2"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeletePopupOpen(true)}
            className="box-border border-2 rounded-md p-1 text-red-500 m-2"
          >
            Delete
          </button>
        </div>
      </div>
      <DeleteContactPopup
        userId={userId}
        refetch={refetch}
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
      />
      {isEditPopupOpen && (
        <CreateEditContactPopup
          userId={userId}
          isOpen={isEditPopupOpen}
          onSuccess={handleEditSucess}
          defaultFormValues={defaultFormValues}
          onClose={() => setIsEditPopupOpen(false)}
        />
      )}
    </>
  );
};

export default Contact;
