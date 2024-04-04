import React from "react";
import styled from "styled-components";
import { Label } from "../../Components.styled";
import { useOrder } from "../../context/Orders";

const Container = styled.div`
	max-width: 60%;
	margin: auto;
	padding: 10px;
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	justify-content: right;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
`;

const Images = styled.div`
	& img {
		width: 100px;
		height: 100px;
	}
`;

const Details = styled.div`
	margin-left: 5px;
`;

const Line = styled.div`
	border: 1px solid #f8f6f6;
	width: 100%;
	max-width: 60%;
	margin: auto;
	margin-bottom: 10px;
	margin-top: 10px;
`;

function OrderItems({ orderID }) {
	const { ordersItemData } = useOrder();
	const data = ordersItemData(orderID);

	return (
		<>
			{data != null &&
				data.map((order) => {
					return order.products.map((val) => {
						return (
							<>
								<Container>
									<Card>
										<Left>
											<Images>
												<img src={val.image} alt='' />
											</Images>
											<Details>
												<Label fontSize='15px' fontWeight='500'>
													{val.name}
												</Label>
												<Label fontSize='13px' fontWeight='400'>
													{val.description}
												</Label>
											</Details>
										</Left>
										<Right>
											<Label
												fontSize='13px'
												fontWeight='400'
												marginRight='10px'>
												PHP {val.price}
											</Label>
											<Label
												fontSize='13px'
												fontWeight='400'
												marginRight='10px'>
												*
											</Label>
											<Label
												fontSize='13px'
												fontWeight='400'
												marginRight='10px'>
												{order.units}
											</Label>
											<Label fontSize='13px' fontWeight='400'>
												PHP {order.subtotal}
											</Label>
										</Right>
									</Card>
								</Container>
								<Line> </Line>
							</>
						);
					});
				})}
		</>
	);
}

export default OrderItems;
