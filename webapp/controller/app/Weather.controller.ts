import BaseController from "../BaseController";
import MessageBox from "sap/m/MessageBox";
import { InputBase$ChangeEvent } from "sap/m/InputBase";
import * as Nominatim from "nominatim-client";
import Router from "sap/f/routing/Router";
import Route from "sap/ui/core/routing/Route";

// Types
import { WeatherInfo } from "hello/world/ts/types/weather.types";

/**
 * @namespace hello.world.ts.controller.app
 */
export default class Weather extends BaseController {
	onInit(): void {
		this.initMainModel(); // Iniciar modelo 'main'
		this.oRouter = this.getRouter() as Router;
		this.oRouteDetail = this.oRouter.getRoute("weather") as Route;
		this.oRouteDetail.attachMatched(this._onRouteMatched, this);
	}

	_onRouteMatched() {
		void this.loadWeatherData();
	}

	async loadWeatherData(
		lat = "4.7110",
		lon = "74.0721",
		sPlaceName = "Colombia"
	) {
		try {
			// Busy
			this.oMain.setProperty("/BusyWeather", true);
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
			);
			const oData = (await response.json()) as WeatherInfo;
			const result = { ...oData, sPlaceName };
			this.oMain.setProperty("/CurrentWeather", result);
			// Busy
			this.oMain.setProperty("/BusyWeather", false);
		} catch (err) {
			console.error(err);
		}
	}

	async locationChange(oEvent: InputBase$ChangeEvent) {
		const oParameters = oEvent.getParameters();
		const sValue = oParameters.value;

		try {
			const nominatimClient = Nominatim.createClient({
				useragent: "UI5 TypeScript Tutorial App",
				referer: "https://localhost",
			});

			// Buscar la ubicación usando async/await
			const results = await nominatimClient.search({ q: sValue });

			if (results.length > 0) {
				await this.loadWeatherData(
					results[0].lat,
					results[0].lon,
					results[0].display_name
				);
			} else {
				MessageBox.alert(`Location ${sValue} not found`, {
					actions: MessageBox.Action.CLOSE,
				});
			}
		} catch (error) {
			MessageBox.alert(`Failure while searching ${sValue}`, {
				actions: MessageBox.Action.CLOSE,
			});
		}
	}
}
