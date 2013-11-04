
function getLRSFromStorage()
{
	return JSON.parse(localStorage.getItem('lrs'));
}

function setLRSFromStorage(lrsToStore)
{
	localStorage.setItem('lrs', JSON.stringify(lrsToStore));
}