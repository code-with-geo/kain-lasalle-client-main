import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useOrder } from "../../context/Orders";

const columns = [
	{
		field: "_id",
		headerName: "Order ID",
		width: 250,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "orderDateTime",
		headerName: "Place On",
		width: 250,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "total",
		headerName: "Total",
		width: 250,
		headerClassName: "theme-header",
		resizable: false,
	},
];

function OrderTable() {
	const { orderData } = useOrder();
	const order = orderData();
	return (
		<>
			<DataGrid
				sx={{
					fontSize: "12px",
					overflowX: "auto",
					"& .theme-header": {
						backgroundColor: "#fff",
						color: "#383737",

						":hover": { color: "#383737" },
					},
					"& .css-ptiqhd-MuiSvgIcon-root": {
						color: "#383737",
					},
				}}
				getRowId={(row) => row._id}
				rows={order != null && order}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
			/>
		</>
	);
}

export default OrderTable;
