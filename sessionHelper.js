
function getLRSFromStorage()
{
	return JSON.parse(localStorage.getItem('lrs'));
}

function setLRSFromStorage(lrsToStore)
{
	localStorage.setItem('lrs', JSON.stringify(lrsToStore));
}

function getAllLRSFromStorage()
{
	return JSON.parse(localStorage.getItem('alllrs'));
}

function setAllLRSFromStorage(lrsToStore)
{
	localStorage.setItem('alllrs', JSON.stringify(lrsToStore));
}
