import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";


export default function SearchBar({ cityChange, error, setCityError, CitiesList}) {
	const [input, setInput] = useState();

	return !error ? (
		<div>
			<TextField
				id="standard-basic"
				label="Search for a city"
				justify="center"
				onChange={(e) => setInput(e.target.value)}
			/>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={CitiesList}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="City" />}
				onChange={(e) => setInput(e.target.value)}
				id="standard-basic"
				label="Search for a city"
				justify="center"
			/>
			<Button onClick={() => cityChange(input)}>search</Button>
		</div>
	) : (
		<div>
			<TextField
				id="standard-basic"
				label="Invalid City"
				error
				id="standard-error-helper-text"
				onChange={(e) => {
					setInput(e.target.value);
					setCityError(false);
				}}
			/>
		</div>
	);
}

