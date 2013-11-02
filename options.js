// Saves options to localStorage.
function save_options() {
  
    var LRSendPoint = document.getElementById("LRSendPoint").value;
	localStorage["LRSendPoint"] = LRSendPoint;
  
	var username = document.getElementById("username").value;
	localStorage["username"] = username;
  
    var password = document.getElementById("password").value;
	localStorage["password"] = password;

  
  
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var LRSendPoint = localStorage["LRSendPoint"];
	var username = localStorage["username"];
	var password = localStorage["password"];

	console.log(LRSendPoint);
	if (!(LRSendPoint === undefined || LRSendPoint == null))
		document.getElementById("LRSendPoint").value = LRSendPoint;
	if (!(username === undefined || username == null))
		document.getElementById("username").value = username;
	if (!(password === undefined || password == null))
		document.getElementById("password").value = password;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);