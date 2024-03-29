import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  //http://3.26.255.165:5300/api/complaints/nic/200026401823
  const handleStatusChange = (complaintId, status) => {
    axios
      .patch(
        `https://complaint-service.onrender.com/api/complaints/${complaintId}`,
        {
          status,
        }
      )
      .then((response) => {
        // update the status of the complaint in the state
        const updatedComplaints = complaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, status } : complaint
        );
        setComplaints(updatedComplaints);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://complaint-service.onrender.com/api/complaints")
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      field: "complaintID",
      headerName: "Complaint ID",
      flex: 1,
      renderCell: (params) => {
        const cId = params.row._id; // Assuming you have an 'id' field for each vehicle
        return (
          <Link to={`/complaints/${cId}`} style={{ textDecoration: "none" }}>
            {params.value}
          </Link>
        );
      },
    },
    { field: "nic", headerName: "NIC", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return (
          <select
            value={params.value}
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Resolved">Resolved</option>
          </select>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        pt: 6,
        pb: 6,
      }}
    >
      <Container>
        <Divider>
          <Chip
            label="Citizen Complaints"
            component="h1"
            sx={{
              color: "white",
              backgroundColor: "#263238",
              fontSize: "23px",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          ></Chip>
        </Divider>
      </Container>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#2e7c67",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#a6a6a6",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f2f0f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#a6a6a6",
          },
          "& .MuiCheckbox-root": {
            color: `${"#1e5245"} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${"#141414"} !important`,
          },
          pr: 10,
          pl: 10,
        }}
      >
        <DataGrid
          rows={complaints}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};
export default ComplaintTable;
