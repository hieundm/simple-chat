Object.prototype.isAsyncFunction = function () {
	if (this.constructor.name === "AsyncFunction") {
		return true;
	}
	return false;
};
