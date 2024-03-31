import { Link } from "react-router-dom";
import styled from "styled-components";
import { Alert } from "@mui/material";

export const Label = styled.p`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	text-align: ${(props) => props.textAlign};
	padding: ${(props) => props.padding};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	display: ${(props) => props.display};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
`;

export const PageLinks = styled(Link)`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	text-align: ${(props) => props.textAlign};
	padding: ${(props) => props.padding};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	display: ${(props) => props.display};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	border-radius: ${(props) => props.borderRadius};
	text-decoration: none;

	&:hover {
		background-color: ${(props) => props.hover};
	}
`;

export const Button = styled.button`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	font-weight: ${(props) => props.fontWeight};
	font-size: ${(props) => props.fontSize};
	color: ${(props) => props.color};
	background-color: ${(props) => props.bgColor};
	text-align: ${(props) => props.textAlign};
	padding: ${(props) => props.padding};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	display: ${(props) => props.display};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	border-radius: ${(props) => props.borderRadius};
	line-height: ${(props) => props.lineHeight};
	text-decoration: none;
	border: none;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.hover};
	}
`;

export const TextBox = styled.input`
	height: ${(props) => props.height}; //40px;
	width: ${(props) => props.width}; //250px;
	line-height: 28px;
	padding: 0 1rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};

	::placeholder {
		color: #9e9ea7;
	}

	:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}
`;

export const ErrorAlert = styled(Alert)`
	margin-bottom: 10px;
	width: 500px;
`;
