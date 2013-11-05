// Saves options to localStorage.
function save_options() {
  
    var LRSendPoint = document.getElementById("LRSendPoint").value;
	
	var username = document.getElementById("username").value;
	
    var password = document.getElementById("password").value;
	
	var email = document.getElementById("email").value;
	
	var lrs = 
	{
		email : email,
		endpoint : LRSendPoint,
		username : username, 
		password : password
	};
  
   setLRSFromStorage(lrs);
  
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function addMore(){
	var number = 1 + Math.floor(Math.random() * 6);
	var removeButton = $("<button>").html("-").click(function() {
		$(this).parent().remove();
		
	});
	var anotherOne = $("<div class='parent'>").html(number +"!!").append(removeButton);
	$("#container").append(anotherOne);
	
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var lrs = getLRSFromStorage();

	var LRSendPoint = lrs.endpoint;
	var username = lrs.username;
	var password = lrs.password;
	var email = lrs.email;

	console.log(LRSendPoint);
	if (!(LRSendPoint === undefined || LRSendPoint == null))
		document.getElementById("LRSendPoint").value = LRSendPoint;
	if (!(username === undefined || username == null))
		document.getElementById("username").value = username;
	if (!(password === undefined || password == null))
		document.getElementById("password").value = password;
	if (!(email === undefined || email == null))
		document.getElementById("email").value = email;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#addMore').addEventListener('click', addMore);