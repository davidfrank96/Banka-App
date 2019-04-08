const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === 'admin@gmail.com' && password === 'password') {
    window.location = 'admin/admin_dashboard.html';
  } else if (email === 'staff@gmail.com' && password === 'password') {
    window.location = "staffs/staff_dashboard.html";
  } else {
    window.location = 'user_profile.html';
  }
});
