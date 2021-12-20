import React, { useState, useEffect, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "../lib/context/useContext";

export default function SearchBar({
	cityChange,
	error,
	setCityError,
	CitiesList,
	setCitiesList,
	currentWether,
}) {
	const [text, setText] = useState("tel aviv");
	const newArr = [];
	const data = useContext(UserContext);
	const [favBtnColor, setFavBtnColor] = useState("none");

	const citesAutoComplete = async (input) => {
		const res = await axios.post(
			"http://localhost:8000/search/getAutoComplete",
			{ input }
		);
		if (res.data.name !== "Error") {
			for (let index = 0; index < res.data.length; index++) {
				newArr.push(res.data[index].LocalizedName);
			}
			return setCitiesList(newArr);
		} else {
			setCityError(true);
		}
	};

	const saveFavorite = (e) => {
		setFavBtnColor("secondary");
		data.favorites.push({
			city: text,
			text: currentWether[0].WeatherText,
			temp: currentWether[0].Temperature.Imperial.Value,
			unit: currentWether[0].Temperature.Imperial.Unit,
		});
	};

	useEffect(() => {
		citesAutoComplete("h");
		cityChange("Tel aviv");
	}, []);

	return (
		<div>
			<CardActions disableSpacing>
				Like
				<IconButton
					aria-label="add to favorites"
					color={favBtnColor}
					onClick={(e) => saveFavorite(e)}
				>
					<FavoriteIcon />
				</IconButton>
			</CardActions>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Autocomplete
					options={CitiesList}
					autoHighlight
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} />}
					onInputChange={(e) => {
						setText(e.target.innerText || e.target.value || "h");
						citesAutoComplete(e.target.innerText || e.target.value || "h");
					}}
				/>
				<Button
					onClick={() => {
						cityChange(text);
						setFavBtnColor("none");
					}}
				>
					Search
				</Button>
			</div>
			<h1>{text}</h1>
		</div>
	);
}
