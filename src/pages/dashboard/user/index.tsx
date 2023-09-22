import { UserState, selectUsers } from "@/store/usersSlice";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function User() {
  const params = useParams();
  const users = useSelector(selectUsers);
  const [user, setUser] = useState<UserState | undefined>();

  useEffect(() => {
    setUser(users.find((user) => user.id === Number(params.id)));
  }, [users]);

  return (
    <main className="p-3">
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden bg-gray-200 dark:bg-slate-800">
        <Table striped>
          <Table.Head></Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Name
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.name}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Username
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.username}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Email
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.email}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Address
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.address.street}
                  <br />
                  {user?.address.suite}
                  <br />
                  {user?.address.city}
                  <br />
                  {user?.address.zipcode}
                  <br />
                  Lat: {user?.address.geo.lat}
                  <br />
                  Lng: {user?.address.geo.lng}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Phone
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.phone}
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="font-medium text-slate-900 dark:text-white">
                  Website
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.website}
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}
