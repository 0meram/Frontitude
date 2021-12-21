import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/search/SearchCity.jsx";
import Cards from "./components/cards/Card.jsx";
import axios from "axios";
import ButtonAppBar from "./components/nav/nav.jsx";
import Favorites from "./components/favorites/favorites.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./components/lib/context/useContext";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
	const [cityError, setCityError] = useState("");
	const [daysList, setDaysList] = useState([]);
	const [CitiesList, setCitiesList] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [currentWether, setCurrentWether] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentText, setCurrentText] = useState("")
	const [currentValue, setCurrentValue] = useState("")
	const [currentF, setCurrentF] = useState("")

	const cityChange = async (inputChange) => {
		setLoading(true);
		const res = await axios.post("http://localhost:8000/search/getCity", {
			inputChange,
		});
		if (res.data !== "error") {
			await getCurrentWether(res.data);
			await handleCityChange(res.data);
		} else {
			setCityError("something went wrong");
		}
	};

	const handleCityChange = async (cityId) => {
		const res = await axios.post("http://localhost:8000/search/getForecast", {
			cityId,
		});
		if (res.data.name !== "Error") {
			setDaysList(res.data);
		} else {
			setCityError("something went wrong, try again!");
		}
	};

	const getCurrentWether = async (cityId) => {
		const res = await axios.post(
			"http://localhost:8000/search/getCurrentWether",
			{
				cityId,
			}
		);
		if (res.data !== "error") {
			setLoading(false);
			setCurrentWether(res.data);
			setCurrentText(res.data[0].WeatherText);
			setCurrentValue(res.data[0].Temperature.Imperial.Value);
			setCurrentF(res.data[0].Temperature.Imperial.Unit);
		} else {
			setCityError("something went wrong, try again!");
		}
	};

	useEffect(() => {
		cityChange("Tel aviv");
	}, []);

	return (
		<Router>
			<div className="App">
				<UserContext.Provider
					value={{
						favorites: favorites,
						setFavorites: setFavorites,
					}}
				>
					<ButtonAppBar />
					<Switch>
						<Route exact path="/">
							<Search
								cityChange={cityChange}
								error={cityError}
								setCityError={setCityError}
								CitiesList={CitiesList}
								setCitiesList={setCitiesList}
								currentWether={currentWether}
							/>
							{loading && (
								<ClipLoader color="black" loading={true} css="" size={100} />
							)}
							<Cards
								weatherData={daysList}
								text={currentText}
								value={currentValue}
								unit={currentF}
							/>
						</Route>
						<Route exact path="/favorites">
							<Favorites />
						</Route>
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
