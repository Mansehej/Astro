const getFromNeoWs = require('./getFromNeoWs');
const { extractFields, mergeNeoDates, sortByApproach } = require('./neoListParser')

exports.getFromNeoWs = getFromNeoWs
exports.extractFields = extractFields
exports.mergeNeoDates = mergeNeoDates
exports.sortByApproach = sortByApproach