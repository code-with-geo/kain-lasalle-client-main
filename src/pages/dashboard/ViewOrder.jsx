import { KeyboardBackspace } from "@mui/icons-material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import OrderItemsTable from "../../components/manage-account/OrderItemsTable";
import { Button, Label } from "../../components/Components.styled";
import { useOrder } from "../../context/Orders";
import Axios from "axios";
import { ToggleMessage } from "../../utils/SweetAlert";
import Swal from "sweetalert2";
const Container = styled.div``;

const Wrapper = styled.div`
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	& h2 {
		font-size: 15px;
		margin-left: 10px;
		font-weight: 500;
	}
`;

const BackArrow = styled(KeyboardBackspace)`
	cursor: pointer;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
`;

const Body = styled.div``;

const ActionContianer = styled.div`
	display: flex;
	max-width: 60%;
	margin: auto;
	align-content: center;
	flex-direction: column;
`;

const Top = styled.div`
	display: flex;
	align-content: center;
	justify-content: right;
	margin-bottom: 20px;
`;

const Bottom = styled.div`
	display: flex;
	align-content: center;
	justify-content: right;
`;

function formatDate(inputDate) {
	const date = new Date(inputDate);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

function ViewOrder() {
	const navigate = useNavigate();
	const { orderID } = useParams();
	const { ordersDataByID } = useOrder();
	const data = ordersDataByID(orderID);

	const payOrder = () => {
		try {
			Axios.post(
				`https://kain-lasalle-main-backend.onrender.com/orders/verify`,
				{
					orderID,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						ToggleMessage("error", res.data.message);
					} else if (res.data.responsecode === "200") {
						window.open(`${res.data.paymentURL}`, "_blank");
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const cancelOrder = () => {
		Swal.fire({
			title: "Cancel Transaction",
			text: "Are you sure you want to cancel this transaction?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b0c5a4",
			confirmButtonText: "Proceed",
			cancelButtonColor: "#FF204E",
			cancelButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					Axios.post(
						`https://kain-lasalle-main-backend.onrender.com/orders/cancellation`,
						{
							orderID,
						}
					)
						.then((res) => {
							if (res.data.responsecode === "402") {
								ToggleMessage("error", res.data.message);
							} else if (res.data.responsecode === "200") {
								ToggleMessage("error", res.data.message);
							}
						})
						.catch((err) => {
							if (err.response) Error();
						});
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<Left>
							<BackArrow fontSize='small' onClick={() => navigate("/")} />
							<h2>Ordered Product</h2>
						</Left>
						<Right>
							<Label fontSize='13px' display='flex' alignItems='center'>
								Order Status:
								<Label fontSize='13px' marginLeft='10px' marginRight='20px'>
									{data != null && data[0].orderStatus}
								</Label>
							</Label>
						</Right>
					</Header>
					<Body>
						<OrderItemsTable orderID={orderID} />
					</Body>
					<ActionContianer>
						<Label fontSize='13px' display='flex' alignItems='center'>
							Payment Status:
							<Label fontSize='13px' marginLeft='10px'>
								{data != null && data[0].paymentStatus}
							</Label>
						</Label>
						<Top>
							<Label marginRight='10px'>Total</Label>
							<Label>{data != null && data[0].total}</Label>
						</Top>
						<Bottom>
							{(data != null && data[0].paymentStatus !== "Unpaid") ||
								(data != null && data[0].orderStatus !== "Cancelled" && (
									<Button
										height='40px'
										width='200px'
										marginRight={
											data != null &&
											data[0].paymentType === "Pay Online" &&
											"10px"
										}
										bgColor='#EE4E4E'
										color='#fff'
										onClick={() => cancelOrder()}>
										Cancel Order
									</Button>
								))}
							{data != null &&
								data[0].paymentType === "Pay Online" &&
								data[0].orderStatus !== "Cancelled" &&
								data[0].paymentStatus !== "Paid" && (
									<Button
										height='40px'
										width='200px'
										bgColor='#b0c5a4'
										color='#fff'
										onClick={() => payOrder()}>
										Pay Order
									</Button>
								)}
						</Bottom>
					</ActionContianer>
				</Wrapper>
			</Container>
		</>
	);
}

export default ViewOrder;
