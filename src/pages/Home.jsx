import { Label } from "../components/Components.styled";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/store/Card";

const Container = styled.div`
	padding: 10px;
	height: calc(100vh - 140px);
`;

const Wrapper = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
`;

const Store = styled.div`
	display: flex;
	align-items: center;
`;

const StoreCards = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
`;

const Content = styled.div`
	margin-bottom: 10px;
`;

function Home() {
	return (
		<>
			<Container>
				<Wrapper>
					<Content>
						<Label color='#383737' fontSize='25px' fontWeight='500'>
							There's something for everyone!
						</Label>
					</Content>
					<Store>
						<StoreCards>
							<Card />
						</StoreCards>
					</Store>
				</Wrapper>
			</Container>
		</>
	);
}

export default Home;
