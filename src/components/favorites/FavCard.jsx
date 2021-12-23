import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import { UserContext } from "../lib/context/useContext";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
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
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleRemove = () => {
		data.setFavorites([...data.favorites].filter((el) => el !== props.fav));
	};

	return (
		<div>
			<Card className={classes.root} key={props.id} onClick={handleOpen}>
				<CardActionArea>
					<div
						style={{
							padding: 16,
						}}
					>
						<h1>{props.fav.city}</h1>
					</div>
				</CardActionArea>
			</Card>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 1000,
				}}
			>
				<Fade in={open}>
					<Card key={props.key}>
						<CardActionArea>
							<div
								style={{
									padding: 16,
									textAlign: "center",
								}}
							>
								<h4>{props.fav.city}</h4>
								<h1>{props.fav.text}</h1>
								<h2>
									{props.fav.temp} {props.fav.unit}
								</h2>
								<Button
									color="secondary"
									size="small"
									variant="outlined"
									onClick={() => handleRemove(props.fav)}
								>
									Remove off my list
								</Button>
							</div>
						</CardActionArea>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
}
