import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace hello.world.ts.control
 */
export default class WindDirection extends Control {
	static readonly metadata: MetadataOptions = {
		properties: {
			/**
			 * The direction in degrees FROM which the wind blows (this is the internationally common definition). Value 0 means: wind blows from North to South.
			 */
			direction: "float",
		},
	};

	renderer = {
		apiVersion: 2,
		render: (rm: RenderManager, control: WindDirection) => {
			rm.openStart("div", control);
			rm.style("font-size", "2rem"); // Tamaño del texto.
			rm.style("width", "2rem"); // Ancho del contenedor.
			rm.style("height", "2rem"); // Altura del contenedor.
			rm.style("display", "inline-block"); // Diseño en línea del control.
			rm.style("color", "blue"); // Color de la flecha.
			rm.style("transform-origin", "center"); // Punto de rotación.

			rm.style("transform", `rotate(${control.getDirection() + 90}deg)`); // arrow is pointing right by default, direction 0 means blowing FROM the north, so the arrow has to point down
			rm.openEnd();
			rm.text("➢");
			rm.close("div");
		},
	};

	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(id?: string, settings?: $WindDirectionSettings);
	constructor(idOrSettings?: string | $WindDirectionSettings);
	constructor(id?: string, settings?: $WindDirectionSettings) {
		super(id, settings);
	}
	// new WindDirection({
	// 	direction
	// })
}
