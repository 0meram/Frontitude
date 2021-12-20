import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import { UserContext } from "../lib/context/useContext";
import "./favorites.css";

const useStyles = makeStyles({
	root: {
		width: 150,
		margin: 10,
		overflow: "hidden",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default function FavCard(props) {
	const classes = useStyles();
	const data = useContext(UserContext);

	const handleRemove = () => {
		data.setFavorites([...data.favorites].filter((el) => el !== props.fav));
	};

	return (
		<div>
			<Card className={classes.root} key={props.key}>
				<CardActionArea>
					<div
						style={{
							padding: 16,
						}}
					>
						<h1>{props.fav.city}</h1>
						<h2>{props.fav.text}</h2>
						<b>
							{props.fav.temp} {props.fav.unit}
						</b>
						<Button
							size="small"
							variant="outlined"
							onClick={() => handleRemove(props.fav)}
						>
							Remove
						</Button>
					</div>
				</CardActionArea>
			</Card>
		</div>
	);
}
