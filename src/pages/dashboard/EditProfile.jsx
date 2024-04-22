import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextBox } from "../../components/Components.styled";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/User";
import Axios from "axios";
import { useForm } from "react-hook-form";

const Container = styled.div``;

const Wrapper = styled.div`
	max-width: 50%;
	margin: auto;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	& h2 {
		margin-left: 10px;
		font-weight: 400;
	}
`;

const BackArrow = styled(KeyboardBackspace)`
	cursor: pointer;
`;

const Body = styled.div``;

const List = styled.ul`
	display: flex;
	align-items: center;
	flex-direction: column;
	list-style: none;
	gap: 10px;
`;

const ListItem = styled.li`
	display: ${(props) => props.display};
	align-items: ${(props) => props.alignItems};
	flex-direction: ${(props) => props.flexDirection};
`;

function EditProfile() {
	const navigate = useNavigate();
	const user = useUserData();
	const { handleSubmit, register } = useForm();

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [userID, setUserID] = useState();

	useEffect(() => {
		if (user != null) {
			setName(user.name);
			setEmail(user.email);
			setUserID(user._id);
		}
	}, [user]);

	const _editProfile = (data, event) => {
		event.preventDefault();
		console.log(userID);
		const formData = new FormData();
		formData.append("userID", userID);
		formData.append("name", name);
		formData.append("email", email);

		try {
			Axios.post(`https://kain-lasalle-main-backend.onrender.com/users/edit`, {
				userID,
				name,
				email,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						alert(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
						navigate("/manage-account");
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<BackArrow
							fontSize='small'
							onClick={() => navigate("/manage-account")}
						/>
						<h2>Edit Profile</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_editProfile)}>
							<List>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter your name'
										require='true'
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='email'
										height='30px'
										width='515px'
										placeholder='Please enter your email'
										require='true'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<Button
										width='535px'
										height='40px'
										color='#fff'
										borderRadius='5px'
										bgColor='#343a40'
										type='submit'>
										Save
									</Button>
								</ListItem>
							</List>
						</form>
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default EditProfile;
