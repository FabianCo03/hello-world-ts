import Main from "hello/world/ts/controller/Main.controller";

QUnit.module("Sample Main controller test");

QUnit.test(
	"The Main controller class has all custom methods",
	function (assert) {
		assert.expect(1);
		assert.strictEqual(typeof Main.prototype.locationChange, "function");
	}
);
