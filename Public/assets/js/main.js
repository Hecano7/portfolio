var projects = document.getElementById("projects");

document.addEventListener("DOMContentLoaded", function () {
	if (localStorage.getItem("mail") == "sent") {
		alert("Message Sent: Thank you for your message.");
		localStorage.setItem("mail","");
	}
});	

projects.addEventListener("click", function(){
	portfolio.scrollIntoView({behavior: "smooth"});
});

email.addEventListener("click", function(){
	window.scrollTo({
		top:4500,
		bottom:0,
		behavior: "smooth"
	});
});

function sendEmail() {
	var email = document.getElementById("email").value;
	var name = document.getElementById("name").value;
	var message = document.getElementById("message").value;
	if(email != "" && name != "" && message != ""){
	localStorage.setItem("mail","sent");
	}
};
