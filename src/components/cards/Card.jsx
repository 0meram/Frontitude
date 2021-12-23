import React, { useState } from "react";
import { Card, makeStyles, Grid, Button } from "@material-ui/core/";

const useStyles = makeStyles({
	root: {
		width: 155,
		maxWidth: 155,
		margin: 5,
	},
});

export default function Cards(props) {
	const classes = useStyles();
	const days = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
	const [measure, setMeasure] = useState(false);

	const changeMeasure = () => {
		setMeasure(!measure);
	};

	return (
		<div>
			<h1>
				{props.text}
				{measure ? (
					<h3>
						{props.value}
						{" °F"}
					</h3>
				) : (
					<h3>
						{Math.floor((5 / 9) * (props.value - 32))}
						{" °C"}
					</h3>
				)}
			</h1>
			<Grid container direction="row" justify="center" alignItems="center">
				{props.weatherData.map((item, index) => {
					return (
						<div>
							<h3>{days[index]}</h3>
							<Card className={classes.root} key={item.Date}>
								<h5>{item.Day.IconPhrase}</h5>
								{measure ? (
									<h3>
										{item.Temperature.Maximum.Value}
										{"  "}
										{"°F "}
									</h3>
								) : (
									<h3>
										{Math.floor(
											(5 / 9) * (item.Temperature.Maximum.Value - 32)
										)}
										{" °C"}
									</h3>
								)}
							</Card>
						</div>
					);
				})}
			</Grid>
			<Button
				style={{ margin: 10 }}
				variant="outlined"
				color="secondary"
				onClick={changeMeasure}
			>
				Change measure
			</Button>
		</div>
	);
}
