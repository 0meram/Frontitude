import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../lib/context/useContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavCard from "./FavCard";
import "./favorites.css";
import { v4 as uuidv4 } from "uuid";

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
			<Grid item xs={true} sm={12} md={12} className="parallax">
				<div className="my-cities">
					<h1>
						My favorites Cities <FavoriteIcon />
					</h1>
					<div className="my-cities-list">
						{data.favorites.map(
							(fav) => (
								<FavCard fav={fav} id={uuidv4()} />
							)
						)}
					</div>
				</div>
			</Grid>
		</Grid>
	);
}
