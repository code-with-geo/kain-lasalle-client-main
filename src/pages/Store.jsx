import React from "react";
import styled from "styled-components";
import { Label } from "../components/Components.styled";
import { ProductProvider } from "../context/Product";
import { useParams } from "react-router-dom";
import Cards from "../components/product/Cards";
import { useOrder } from "../context/Orders";

const Container = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

const Content = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
`;
const StoreInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	flex-direction: column;
`;

const Logo = styled.img`
	width: 50px;
	height: 50px;
`;

function Store() {
	const { id } = useParams();
	const { storeData } = useOrder();
	const data = storeData(id);
	return (
		<>
			<Container>
				{" "}
				<StoreInfo>
					<Logo src={data != null && data.image} alt='' />
					<Label fontSize='20px' fontWeight='500'>
						{data != null && data.name}
					</Label>
					<Label fontSize='12px'>{data != null && data.address}</Label>
					<Label fontSize='12px'>{data != null && data.storehour}</Label>
					<Label fontSize='12px'>{data != null && data.contactperson}</Label>
					<Label fontSize='12px'>{data != null && data.contactno}</Label>
				</StoreInfo>
				<Label
					color='#383737'
					fontSize='25px'
					fontWeight='500'
					marginBottom='10px'
					marginTop='20px'>
					Menu
				</Label>
				<ProductProvider storeID={id}>
					<Content>
						<Cards />
					</Content>
				</ProductProvider>
			</Container>
		</>
	);
}

export default Store;
