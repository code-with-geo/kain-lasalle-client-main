import React, { useEffect } from "react";
import styled from "styled-components";
import { Label } from "../../components/Components.styled";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
	height: 100vh;
`;

const Header = styled.header`
	height: 100px;
	display: flex;
	align-items: center;
	box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-webkit-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-moz-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
`;

const Nav = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: 120px;
	height: 100px;
	cursor: pointer;
`;

const Right = styled.div``;

const Body = styled.body`
	height: calc(100vh - 101px);
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Image = styled.img`
	width: 400px;
	height: 400px;
`;

function VerifyEmail() {
	const navigate = useNavigate();
	const { userID, token } = useParams();

	useEffect(() => {
		const _verify = () => {
			try {
				Axios.get(
					`https://kain-lasalle-main-backend.onrender.com/users/${userID}/verify/${token}`
				)
					.then((res) => {
						if (res.data.responsecode === "402") {
							navigate("/login");
						} else if (res.data.responsecode === "200") {
							alert(res.data.message);
						}
					})
					.catch((err) => {
						if (err.response) Error();
					});
			} catch (error) {
				console.log(error);
			}
		};
		_verify();
	}, [userID, token, navigate]);

	return (
		<>
			<Container>
				<Header>
					<Nav>
						<Left>
							<Logo
								src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Flogo-1.png?alt=media&token=6cefb280-8676-4b1a-8857-20b5da4757e6'
								alt=''
								onClick={() => navigate("/login")}
							/>
						</Left>
						<Right></Right>
					</Nav>
				</Header>
				<Body>
					<Wrapper>
						<Label
							fontSize='18px'
							fontWeight='400'
							display='flex'
							alignItems='center'>
							Your email successfully
							<Label
								color='#98ca7a'
								fontSize='25px'
								fontWeight='600'
								marginLeft='10px'>
								Verified
							</Label>
						</Label>
						<Image
							src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Fverify-email.svg?alt=media&token=fa3fdbcf-0d3c-486e-80fc-bce6a61c47c3'
							alt=''
						/>
					</Wrapper>
				</Body>
			</Container>
		</>
	);
}

export default VerifyEmail;
