import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../lib/context/useContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavCard from "./FavCard";
import "./favorites.css";

const useStyles = makeStyles(() => ({
	root: {
		height: "100vh",
	},
}));

export default function Favorites() {
	const classes = useStyles();
	const data = useContext(UserContext);

	return (
		<Grid container component="main" className={classes.root}>
			<Grid item xs={true} sm={12} md={12} className="parallaxp">
				<div className="my-pets">
					<h1>
						My favorites Cities <FavoriteIcon />
					</h1>
					<div className="my-pet-list">
						{data.favorites.map((fav, i) => (
							<FavCard fav={fav} key={i} />
						))}
					</div>
				</div>
			</Grid>
		</Grid>
	);
}
