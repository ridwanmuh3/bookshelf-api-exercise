/* eslint-disable no-tabs */
/* eslint-disable indent */
const trimProperty = (currentArr, tempArr) => {
	return currentArr.forEach((e) => {
		const { id, name, publisher } = e
		tempArr.push({
			id,
			name,
			publisher
		})
	})
}

module.exports = { trimProperty }
