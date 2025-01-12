import { useParams } from "@tanstack/react-router";

import { API_URL } from "../../constants/api.ts";
import useCachedFetch from "../../hooks/useCachedFetch.ts";
import Contact from "../../sections/contact";
import ContactListWithSearch from "../../sections/contactListWithSearch";

const Dashboard = () => {
  const { userName } = useParams({ strict: false }) as { userName: string };

  const { data, error, isPending, refetch } = useCachedFetch({
    url: API_URL,
    dataKey: "users",
  }) as { data: any; error: any; isPending: boolean; refetch: () => any };

  return (
    <div className="flex flex-row">
      <aside className="basis-1/4 m-2 bg-gray-100">
        <ContactListWithSearch
          data={data}
          error={error}
          refetch={refetch}
          userName={userName}
          isPending={isPending}
        />
      </aside>
      {!!userName && (
        <main className="basis-1/2 m-2">
          <Contact refetch={refetch} />
        </main>
      )}
    </div>
  );
};

export default Dashboard;
