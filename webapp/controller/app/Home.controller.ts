import BaseController from "../BaseController";
import Router from "sap/f/routing/Router";
import Route from "sap/ui/core/routing/Route";

/**
 * @namespace hello.world.ts.controller.app
 */
export default class Home extends BaseController {
	onInit(): void {
		this.initMainModel(); // Iniciar modelo 'main'
		this.oRouter = this.getRouter() as Router;
		this.oRouteDetail = this.oRouter.getRoute("home") as Route;
		this.oRouteDetail.attachMatched(this._onRouteMatched, this);
	}

	private _onRouteMatched() {}
}
