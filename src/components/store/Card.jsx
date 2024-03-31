import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../Components.styled";
import { useNavigate } from "react-router-dom";
import { useStoreData } from "../../context/Store";

const Container = styled.div`
	padding: 10px;
	cursor: pointer;
`;
const Image = styled.img`
	width: 100%;
	height: 150px;
`;

function Card() {
	const store = useStoreData();
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/store/${id}`);
	};

	return (
		<>
			{store != null &&
				store.map((store) => {
					return (
						<Container onClick={() => handleClick(store._id)}>
							<Image src={store.image} alt='' />
							<Label fontSize='16px' fontWeight='500'>
								{store.name}
							</Label>
							<Label fontSize='12px' fontWeight='400'>
								{store.description}
							</Label>
						</Container>
					);
				})}
		</>
	);
}

export default Card;
