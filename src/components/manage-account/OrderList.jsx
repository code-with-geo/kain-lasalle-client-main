import React from "react";
import styled from "styled-components";
import { Label } from "../Components.styled";
import OrderTable from "./OrderTable";
import { OrderProvider } from "../../context/Orders";
import { useGetUserID } from "../../hooks/User";

const Container = styled.div`
	padding: 10px;
	background-color: #fff;
`;

const Header = styled.div``;

const Body = styled.div`
	margin-top: 10px;
`;

function OrderList() {
	const userID = useGetUserID();
	return (
		<Container>
			<Header>
				<Label color='#383737' fontSize='18px' fontWeight='500'>
					Recent Orders
				</Label>
			</Header>
			<Body>
				<OrderProvider userID={userID}>
					<OrderTable />
				</OrderProvider>
			</Body>
		</Container>
	);
}

export default OrderList;
