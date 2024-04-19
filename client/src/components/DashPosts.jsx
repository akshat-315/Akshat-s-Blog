import { Table } from "flowbite-react";
import React from "react";

export const DashPosts = () => {
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
      </Table>
    </div>
  );
};
