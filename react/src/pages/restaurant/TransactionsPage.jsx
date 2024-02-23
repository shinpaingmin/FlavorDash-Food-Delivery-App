// import { useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import Header from "../../components/restaurant/Header";

// const TransactionsPage = () => {
//     const theme = useTheme();
//     // Replace with real one later
//     const [page, setPage] = useState(0);
//     const [pageSize, setPageSize] = useState(20);
//     const [sort, setSort] = useState({});
//     const [search, setSearch] = useState('');

//     const columns = [
//         {
//             field: "_id",
//             headerName: "ID",
//             flex: 1
//         },
//         {
//             field: "userId",
//             headerName: "User ID",
//             flex: 1
//         },
//         {
//             field: "createdAt",
//             headerName: "Created At",
//             flex: 1
//         },

//         {
//             field: "products",
//             headerName: "# of Products",
//             flex: 0.5,
//             sortable: false,
//             renderCell: (params) => params.value.length
//         },
//         {
//             field: "cost",
//             headerName: "Cost",
//             flex: 1,
//             renderCell: (params) => `$${Number(params.value).toFixed(2)}`
//         },
//     ]

//     return (
//         <Box m="1.5rem 2.5rem">
//             <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
//             <Box
//                 height="80vh"
//                 sx={{
//                     "& .MuiDataGrid-root": {
//                         border: "none"
//                     },
//                     "& .MuiDataGrid-cell": {
//                         borderBottom: "none"
//                     },
//                     "& .MuiDataGrid-columnHeaders": {
//                         backgroundColor: theme.palette.background.alt,
//                         color: theme.palette.secondary[100],
//                         borderBottom: "none"
//                     },
//                     "& .MuiDataGrid-virtualScroller": {
//                         backgroundColor: theme.palette.primary.light,
//                     },
//                     "&. MuiDataGrid-footerContainer": {
//                         backgroundColor: theme.palette.background.alt,
//                         color: theme.palette.secondary[100],
//                         borderTop: "none"
//                     },
//                     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                         color: `${theme.palette.secondary[200]} !important`
//                     }
//                 }}
//             >
//                 <DataGrid
//                     loading=""  // Replace later
//                     getRowId={(row) => row._id}
//                     rows={(data && data.transactions) || []}
//                     columns={columns}
//                 />
//             </Box>
//         </Box>
//     )
// }

// export default TransactionsPage
