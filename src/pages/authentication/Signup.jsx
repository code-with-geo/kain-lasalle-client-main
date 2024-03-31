import React from "react";
import styled from "styled-components";
import {
	Button,
	Label,
	PageLinks,
	TextBox,
} from "../../components/Components.styled";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 500px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
`;

const Body = styled.div``;

const Form = styled.form``;

const List = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: 250px;
	height: 200px;
`;
function Signup() {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	const _signup = (data, event) => {
		event.preventDefault();
		try {
			Axios.post(`http://localhost:3001/users/signup`, {
				name: data.Name,
				email: data.Email,
				password: data.Password,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						alert(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
						navigate("/login");
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
						<Logo src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Flogo-1.png?alt=media&token=6cefb280-8676-4b1a-8857-20b5da4757e6' />
					</Header>
					<Body>
						<Form onSubmit={handleSubmit(_signup)}>
							<List>
								<ListItem>
									<TextBox
										type='text'
										height='40px'
										width='300px'
										placeholder='Enter your name'
										{...register("Name")}
										required='true'
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='email'
										height='40px'
										width='300px'
										placeholder='Enter your email'
										{...register("Email")}
										required='true'
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='password'
										height='40px'
										width='300px'
										placeholder='Enter your password'
										{...register("Password")}
										required='true'
										minLength={8}
									/>
								</ListItem>
								<ListItem>
									<Button
										height='40px'
										width='340px'
										borderRadius='30px'
										type='submit'>
										Continue
									</Button>
								</ListItem>
								<ListItem>
									<Label fontSize='12px' fontWeight='400'>
										Already have an account?
									</Label>
									<PageLinks
										color='#343a40'
										fontSize='12px'
										fontWeight='400'
										marginLeft='5px'
										to='/login'>
										Login
									</PageLinks>
								</ListItem>
							</List>
						</Form>
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default Signup;
