import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function SearchBar({
	cityChange,
	error,
	setCityError,
	CitiesList,
	setCitiesList,
}) {
	const [text, setText] = useState("h");
	const newArr = [];

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

	useEffect(() => {
		citesAutoComplete(text);
	}, []);

	return (
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
			<Button onClick={() => cityChange(text)}>Search</Button>
			{error}
		</div>
	);
}
