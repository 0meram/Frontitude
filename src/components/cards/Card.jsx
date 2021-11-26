import React, { useState } from "react";
import { Card, makeStyles, Grid, Button } from "@material-ui/core/";
import cx from "classnames";
import styles from "./card.css";

const useStyles = makeStyles({
	root: {
		width: 175,
		margin: 10,
		overflow: "hidden",
	},
});

export default function Cards(props) {
	const classes = useStyles();
	const days = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
	const [measure, setMeasure] = useState(false);

	const changeMeasure = () => {
		setMeasure(!measure);
		console.log("~ measure", measure);
	};

	if (!props.weatherData) return "Loading..";

	return (
		<div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{days.map((day) => {
					return <h4 style={{ margin: 45 }}>{day}</h4>;
				})}
			</div>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={cx(styles.container)}
			>
				{props.weatherData.map((item) => {
					return (
						<Card className={classes.root} key={item.Date}>
							<div>{item.Day.IconPhrase}</div>
							<div>{item.Date}</div>
							<div>
								{measure ? (
									<h3>
										{item.Temperature.Maximum.Value}{" "}
										{item.Temperature.Maximum.Unit}
									</h3>
								) : (
									<h3>
										{item.Temperature.Maximum.Value}{" "}
										{item.Temperature.Maximum.Unit}
									</h3>
								)}
							</div>
						</Card>
					);
				})}
			</Grid>
			<Button onClick={changeMeasure}>Change to C</Button>
		</div>
	);
}
