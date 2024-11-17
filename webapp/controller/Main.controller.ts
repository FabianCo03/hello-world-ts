import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import { InputBase$ChangeEvent } from "sap/m/InputBase";
import * as Nominatim from "nominatim-client";

// Types
import { WeatherInfo } from "../types/weather.types";

/**
 * @namespace hello.world.ts.controller
 */
export default class Main extends BaseController {
	// Para que TS reconozca oMain as JSONModel
	oMain: JSONModel;

	onInit(): void | undefined {
		// model es igual a oMain
		const oMain = new JSONModel();
		this.setModel(oMain);

		void this.loadWeatherData();
	}

	async loadWeatherData(
		lat = "4.7110",
		lon = "74.0721",
		sPlaceName = "Colombia"
	) {
		// default coordinates
		this.oMain = this.getModel() as JSONModel;
		try {
			this.busy(true);
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
			);
			const oData = (await response.json()) as WeatherInfo;
			const result = { ...oData, sPlaceName };

			this.oMain.setProperty("/CurrentWeather", result);
			this.busy(false);
		} catch (err) {
			this.busy(false);
			console.error(err);
		}
	}

	locationChange(oEvent: InputBase$ChangeEvent) {
		const oParameters = oEvent.getParameters();
		const sValue = oParameters.value;

		Nominatim.createClient({
			useragent: "UI5 TypeScript Tutorial App", // useragent and referrer required by the terms of use
			referer: "https://localhost",
		})
			.search({ q: sValue })
			.then((results) => {
				if (results.length > 0) {
					return this.loadWeatherData(
						results[0].lat,
						results[0].lon,
						results[0].display_name
					); // for simplicity just use the first/best match
				} else {
					MessageBox.alert(`Location ${sValue} not found`, {
						actions: MessageBox.Action.CLOSE, // enums are now properties on the default export!
					});
				}
			})
			.catch(() => {
				MessageBox.alert(`Failure while searching ${location}`, {
					actions: MessageBox.Action.CLOSE, // enums are now properties on the default export!
				});
			});
	}
}
