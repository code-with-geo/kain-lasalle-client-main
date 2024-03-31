import React from "react";
import styled from "styled-components";
import { Label } from "../components/Components.styled";
import { ProductProvider } from "../context/Product";
import { useParams } from "react-router-dom";
import Cards from "../components/product/Cards";

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

function Store() {
	const { id } = useParams();
	return (
		<>
			<Container>
				<Label
					color='#383737'
					fontSize='25px'
					fontWeight='500'
					marginBottom='10px'>
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
