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
	const [input, setInput] = useState();

	const citesAutoComplete = async (input) => {
		const res = await axios.post(
			"http://localhost:8000/search/getAutoComplete",
			{ input }
		);
		console.log("~ res.data", res.data);
		if (res.data.name !== "Error") {
			setCitiesList(res.data);
		} else {
			setCityError(true);
		}
	};

	useEffect(() => {
		citesAutoComplete(input);
	}, [input]);;
    console.log('~ input', input);

	return (
		<div style={{display: "flex", justifyContent:"center"}}>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={CitiesList || [1,2]}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="City" />}
				onInputChange={(e) => {setInput(e.target.value);}}
				id="standard-basic"
				label="Search for a city"
				justify="center"
			/>
			<Button onClick={() => cityChange(input)}>search</Button>
			{error}
		</div>
	);
}
