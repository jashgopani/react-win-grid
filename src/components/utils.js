export const getUniqueId = (n) => {
	n = n ?? 2;
	return Math.floor(Math.random().toFixed(n) * Math.pow(10, n));
};

export const getXY = (element, event) => {
	if (element && event) {
		const rect = element.getBoundingClientRect();
		return [event.clientX - rect.left, event.clientY - rect.top];
	}
	return [null, null];
};

export const join = (arr, alternate) => {
	return Array.isArray(arr)
		? arr.join()
		: Array.isArray(alternate)
		? alternate.join()
		: '';
};
