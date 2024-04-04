import React from "react";
import styled from "styled-components";
import { Cancel, Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Container = styled.div``;

const CancelButton = styled(Cancel)`
	cursor: pointer;
	margin-left: 10px;
	color: #d44a4a;
`;

const ViewButton = styled(Visibility)`
	cursor: pointer;
	color: #868e96;
`;

function ActionButton({ params }) {
	const navigate = useNavigate();

	return (
		<>
			<Container>
				<Tooltip title='View'>
					<ViewButton
						onClick={() => navigate(`/orders/view/${params.row._id}`)}
					/>
				</Tooltip>
				<Tooltip title='Cancel Order'>
					<CancelButton onClick={() => alert(params.row._id)} />
				</Tooltip>
			</Container>
		</>
	);
}

export default ActionButton;
