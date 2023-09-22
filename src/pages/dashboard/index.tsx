import useLogin from "@/hooks/useLogin";
import { fetchUsers, selectUsers } from "@/store/usersSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { Button, Table } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useLogin({});

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers() as unknown as AnyAction);
    }
  }, [users]);

  return (
    <main className="p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Users
        </h1>
        <Button pill onClick={() => navigate("/create")}>
          Create User
        </Button>
      </div>
      <div className="max-w-7xl overflow-x-auto mx-auto rounded-xl">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Website</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Link to={user.id.toString()}>{user.name}</Link>
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.address.street}
                  <br />
                  {user.address.suite}
                  <br />
                  {user.address.city}
                  <br />
                  {user.address.zipcode}
                </Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.website}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}
