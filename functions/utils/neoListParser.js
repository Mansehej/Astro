/**
 * Returns a list of NeoWs objects after extracting the specific fields needed in each object.
 *
 * @param {Array} unparsedList - A list of NeoWs objects with all fields.
 *
 * @return {Array} - A list of Neos objects with fields extracted.
 */
function extractFields(unparsedList) {
    return unparsedList.map(({ id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data }) => ({ id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data }))
}

/**
 * Merges lists of NeoWs objects from different dates.
 *
 * @param {Object} dateWiseNeos - Map of lists of NeoS for different dates.
 *
 * @return {Array} - A list of Neos objects.
 */
function mergeNeoDates(dateWiseNeos) {
    return Object.keys(dateWiseNeos).map(neos => dateWiseNeos[neos]).flat();
}

/**
 * Sorts list of Neos according to closest approach
 *
 * @param {Array} listOfNeos - Unsorted list of Neos.
 *
 * @return {Array} - List of Neos sorted according to closest approach
 */
function sortByApproach(listOfNeos) {
    sortedList = [...listOfNeos]
    sortedList.sort((neo1, neo2) => neo1.close_approach_data[0].miss_distance.kilometers - neo2.close_approach_data[0].miss_distance.kilometers)
    return sortedList
}


exports.extractFields = extractFields;
exports.mergeNeoDates = mergeNeoDates;
exports.sortByApproach = sortByApproach;