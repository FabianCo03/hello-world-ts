import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";

// Types
import { WeatherInfo } from "../types/weather.types"


/**
 * @namespace hello.world.ts.controller
 */
export default class Main extends BaseController {
	// Para que TS reconozca oMain as JSONModel
	oMain: JSONModel

	onInit(): void | undefined {
		// model es igual a oMain
		const oMain = new JSONModel()
		this.setModel(oMain)

		void this.loadWeatherData();
	}

	async loadWeatherData(lat = "4.7110", lon = "74.0721") { // default coordinates
		this.oMain = this.getModel() as JSONModel
		try {
			this.busy(true)
			const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
			const jsonData = await response.json() as WeatherInfo;
			this.oMain.setProperty('/CurrentWeather', jsonData);
			this.busy(false)
		} catch (err) {
			this.busy(false)
			console.error(err);
		}
	}
}
