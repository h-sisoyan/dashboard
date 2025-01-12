import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

import { SUCCESS } from "../../constants/api";
import { DASHBOARD } from "../../constants/paths";
import CreateEditContactPopup from "../../sections/createEditContactPopup";

const ContactListWithSearch = ({
  data,
  error,
  refetch,
  userName,
  isPending,
}: {
  error: object;
  userName: string;
  isPending: boolean;
  refetch: () => void;
  data: Array<{ id: number; name: string; username: string }>;
}) => {
  const [search, setSearch] = useState("");
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && !isPending && !userName) {
      navigate({
        state: { userId: data[0].id } as any,
        to: `/${DASHBOARD}/${data[0].username}`,
      });
    }
  }, [data]);

  const handleCreateSucess = useCallback(async ({ id: userId }: any) => {
    setIsCreatePopupOpen(false);

    const { data, status } = await refetch() as any;

    if (status === SUCCESS) {
      const { id, username } = data.find(({ id }: { id: number }) => id === userId) || data[0];

      navigate({ to: `/${DASHBOARD}/${username}`, state: { userId: id } as any });
    }

    alert("Contact successfully created!");
  }, []);

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Someting went wrong</p>;

  const filteredData = search
    ? data.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div>
      <div className="m-2 flex flex-row">
        <input
          type="search"
          value={search}
          placeholder="Search"
          className="box-border border-2 border-gray-400 rounded-md m-2 p-1"
          onChange={({ target: { value } }) => setSearch(value.trimStart())}
        />
        <button
          onClick={() => setIsCreatePopupOpen(true)}
          className="box-border border-2 border-blue-400 rounded-md p-1 text-blue-500 m-2"
        >
          New
        </button>
      </div>
      <hr />
      <ul>
        {filteredData.map(({ id, name, username }) => (
          <li
            key={id}
            className={username === userName ? "bg-blue-400 rounded-md m-2 p-2" : "m-1 p-1"}
            onClick={() =>
              navigate({
                state: { userId: id },
                to: `/${DASHBOARD}/${username}`,
              } as object)
            }
          >
            {name}
          </li>
        ))}
      </ul>
      {isCreatePopupOpen && (
        <CreateEditContactPopup
          userId=""
          defaultFormValues={null}
          isOpen={isCreatePopupOpen}
          onSuccess={handleCreateSucess}
          onClose={() => setIsCreatePopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactListWithSearch;
