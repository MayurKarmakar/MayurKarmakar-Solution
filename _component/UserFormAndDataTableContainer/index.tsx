"use client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import UsersDataTable from "./DataTable";
import UserForm from "./UserForm";
import Head from "next/head";
import Script from "next/script";

const UserFormAndDataTableContainer: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <Script
          src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"
          strategy="beforeInteractive"
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          gap: 10,
          justifyContent: "start",
          alignItems: "center",
          paddingY: 5,
          backgroundImage:
            "radial-gradient(ellipse at bottom left, rgba(0,163,203,1) 40%, rgba(0,163,203,0) 40%), radial-gradient(ellipse at top right, rgba(0,163,203,1) 30%, rgba(0,163,203,0) 30%),linear-gradient(to right, rgba(98,87,147,1) 0%, rgba(98,87,147,1) 33%, rgba(213,93,100,1) 33%, rgba(213,93,100,1) 66%, rgba(228,145,41,1) 66%)",
        }}
      >
        <UserForm />
        <UsersDataTable />
      </Box>
    </>
  );
};

export default UserFormAndDataTableContainer;
