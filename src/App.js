import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/search/SearchCity.jsx";
import Cards from "./components/cards/Card.jsx";
import axios from "axios";

function App() {
	const [cityError, setCityError] = useState(false);
	const [daysList, setDaysList] = useState();
	const [CitiesList, setCitiesList] = useState();

	const cityChange = async (inputChange) => {
		const res = await axios.post("http://localhost:8000/search/getCity", {
			inputChange,
		});
		if (res.data !== "error") {
			handleCityChange(res.data);
		} else {
			setCityError(true);
		}
	};

	const handleCityChange = async (cityId) => {
		const res = await axios.post("http://localhost:8000/search/getForecast", {
			cityId,
		});
		if (res !== "error") {
			setDaysList(res.data);
			console.log("~ res.data", res.data);
		} else {
			setCityError(true);
		}
	};

	const citesAutoComplete = async () => {
		const res = await axios.get("http://localhost:8000/search/getAutoComplete");
		if (res.data !== "error") {
			setCitiesList(res.data);
		} else {
			setCityError(true);
		}
	};

	useEffect(() => {
	citesAutoComplete()
	}, [])

	return (
		<div className="App">
			<h1>Frontitude Wether</h1>
			<Search
				cityChange={cityChange}
				error={cityError}
				setCityError={setCityError}
				CitiesList={CitiesList}
			/>
			<Cards weatherData={daysList}/>
		</div>
	);
}

export default App;
