const form = document.querySelector("form");
const error = document.querySelector(".error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // reset errors
  error.textContent = "";

  // get values
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (!data.user) {
      error.textContent = data.message;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
