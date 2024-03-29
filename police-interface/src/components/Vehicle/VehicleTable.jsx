import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);

  // const addHandler = () => {
  //   window.location.href = "http://localhost:3000/vehicles/add";
  // };
  //http://3.26.196.154:5200/api/vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await axios.get(
        "https://vehicle-service-b32q.onrender.com/api/vehicles/"
      );

      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const columns = [
    {
      field: "regNo",
      headerName: "Register Number",
      flex: 1,
      renderCell: (params) => {
        const vehicleId = params.row._id; // Assuming you have an 'id' field for each vehicle
        return (
          <Link
            to={`/vehicles/${vehicleId}`}
            style={{ textDecoration: "none" }}
          >
            {params.value}
          </Link>
        );
      },
    },
    { field: "chassiNo", headerName: "Chassis Number", flex: 1 },
    { field: "vehicleType", headerName: "Vehicle Type", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "vehicleModel", headerName: "Vehicle Model", flex: 1 },
    {
      field: "yearOfManufacture",
      headerName: "Year of Manufacture",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "vehicleOwners",
      headerName: "Vehicle Owners",
      flex: 1,
      valueGetter: (params) => params.row.vehicleOwners.join(", "),
    },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box
      sx={{
        pt: 6,
        pb: 6,
      }}
    >
      <Box>
        <Container>
          <Divider>
            <Chip
              label="Authorized Vehicles"
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
          sx={{ marginLeft: "83%", marginRight: "auto", width: "fit-content" }}
        >
          <Link to="/vehicles/add">
            <Button
              variant="contained"
              //onClick={addHandler}
              sx={{
                height: "30px",
                width: "150px",
                backgroundColor: "#263238",
                "&:hover": {
                  backgroundColor: "#263238",
                },
              }}
            >
              Add a Vehicle
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
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
          rows={vehicles}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.regNo}
        />
      </Box>
    </Box>
  );
};

export default VehicleTable;
