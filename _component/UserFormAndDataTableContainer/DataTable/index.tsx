"use client";

import { AppStore } from "@/_store";
import { Users } from "@/_store/store-types/types";
import { Card, CardContent } from "@mui/material";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons-dt/js/buttons.dataTables.min.mjs";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.mjs";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-fixedheader-dt";
import "datatables.net-responsive-dt";
import "datatables.net-scroller-dt";
import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import classes from "./dataTable.module.css";

const UsersDataTable: NextPage = (): JSX.Element => {
  const users = useSelector((state: AppStore) => state.users);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    if (users.length > 0) {
      const dt = new DataTable(tableRef.current!);
      const newUser = users[users.length - 1];
      dt.rows.add([newUser]).draw(false);
    }
  }, [users]);

  useEffect(() => {
    if (!tableRef.current) return;

    const dt = new DataTable(tableRef.current, {
      lengthMenu: [
        [5, 10],
        [5, 10],
      ],
      columns: [
        { data: "name", name: "Name" },
        { data: "age", name: "Age" },
        { data: "sex", name: "Sex" },
        { data: "mobile", name: "Phone" },
        { data: "govtIdType", name: "Id Type" },
        { data: "govtId", name: "Id Number" },
        { data: "address", name: "Address" },
        { data: "state", name: "State" },
        { data: "city", name: "City" },
        { data: "country", name: "Country" },
        { data: "pincode", name: "Pincode" },
      ],
      dom: '<"top"lf<"spacer">B<"clear">>rt<"bottom"ipr>',
      buttons: [
        {
          text: "Excel",
          title: "My Excel Export",
          exportOptions: {
            columns: ":visible",
          },
          action: function (e, dt, button, config) {
            let data: Users = [];
            dt.rows().every(function () {
              var rowData = this.data();
              data.push(rowData);
            });
            var ws = XLSX.utils.json_to_sheet(data);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
            XLSX.writeFile(wb, "custom-excel-export.xlsx");
          },
        },
        "print",
      ],
      autoWidth: false,
      responsive: true,
      scrollY: "200",
      scrollX: true,
      scrollCollapse: true,
    });

    return () => {
      dt.destroy();
    };
  }, [tableRef]);

  return (
    <Card sx={{ maxWidth: "100%" }} variant="outlined">
      <CardContent>
        <table
          ref={(el) => (tableRef.current = el)}
          id="user-table"
          className="table table-striped table-bordered table-lg row-border hover table-responsive cell-border stripe"
          style={{ width: "100%" }}
          cellSpacing="0"
        >
          <thead style={{ marginTop: 5 }}>
            <tr>
              <th className={classes.tableHeader}>Name</th>
              <th className={classes.tableHeader}>Age</th>
              <th className={classes.tableHeader}>Sex</th>
              <th className={classes.tableHeader}>Phone</th>
              <th className={classes.tableHeader}>Id Type</th>
              <th className={classes.tableHeader}>Id Number</th>
              <th className={classes.tableHeader}>Address</th>
              <th className={classes.tableHeader}>State</th>
              <th className={classes.tableHeader}>City</th>
              <th className={classes.tableHeader}>Country</th>
              <th className={classes.tableHeader}>Pincode</th>
            </tr>
          </thead>
        </table>
      </CardContent>
    </Card>
  );
};

export default UsersDataTable;
