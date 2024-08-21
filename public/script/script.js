document.addEventListener("DOMContentLoaded", function () {
  const roleDropdown = document.getElementById("roleDropdown");
  const customerForm = document.getElementById("customerSignupForm");
  const cleanerForm = document.getElementById("cleanerSignupForm");



  roleDropdown.addEventListener("change", () => {
    if (roleDropdown.value === "customer") {
      customerForm.style.display = "block";
      cleanerForm.style.display = "none";
    } else if (roleDropdown.value === "cleaner") {
      customerForm.style.display = "none";
      cleanerForm.style.display = "block";
    } else {
      customerForm.style.display = "none";
      cleanerForm.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropDown = document.getElementById("dropDown");
  const cleanerLogin = document.getElementById("cleanerLoginForm");
  const customerLogin = document.getElementById("customerLoginForm");

  cleanerLogin.style.display = "none";
  customerLogin.style.display = "none";

  dropDown.addEventListener("change", () => {
    if (dropDown.value === "customer") {
      customerLogin.style.display = "block";
      cleanerLogin.style.display = "none";
    } else if (dropDown.value === "cleaner") {
      customerLogin.style.display = "none";
      cleanerLogin.style.display = "block";
    } else {
      customerLogin.style.display = "none";
      cleanerLogin.style.display = "none";
    }
  });
});
