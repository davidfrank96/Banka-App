const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", e => {
  e.preventDefault();
     if (email === "admin@gmail.com" && password === "password") {
         window.location = "..admin/admin_dashboard.html";
     } else {
       window.location = "user_profile.html";
       }
  console.log(email);
  console.log(password);
});
