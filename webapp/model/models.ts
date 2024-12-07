import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import Device from "sap/ui/Device";

export default {
	createDeviceModel: () => {
		const oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(BindingMode.OneWay);
		return oModel;
	},

	createMainModel: () => {
		let sModeIsOnline: string = localStorage.getItem("ModeIsOnlineStorage");
		// Convertir a Boolean
		var bModeIsOnline: boolean = sModeIsOnline === "true";
		const dataInitial = {
			ModeIsOnline: bModeIsOnline,
			Busy: {},
		};

		const oModel = new JSONModel(dataInitial);
		oModel.setDefaultBindingMode("TwoWay");
		oModel.setSizeLimit(10000);
		return oModel;
	},
};
