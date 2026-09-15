/* =====================================================
   ADMIN LOGIN
   Owner: Student D
===================================================== */

function initLoginPage() {
    // If already logged in, skip straight to the dashboard.
    if (AuthAPI.getSession()) {
        window.location.href = "dashboard.html";
        return;
    }

    const form = document.getElementById("loginForm");
    const errorEl = document.getElementById("loginError");

    form.addEventListener("submit", async event => {
        event.preventDefault();
        errorEl.textContent = "";

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        try {
            await AuthAPI.login(username, password);
            window.location.href = "dashboard.html";
        } catch (error) {
            errorEl.textContent = error.message || "Login failed.";
        }
    });
}


/**
 * Call at the top of every protected admin page.
 * Redirects to the login page if nobody's signed in.
 */
function requireAdminSession() {
    if (!AuthAPI.getSession()) {
        window.location.href = "index.html";
    }
}


function bindLogoutButton() {
    const button = document.getElementById("logoutButton");
    if (!button) return;

    button.addEventListener("click", () => {
        AuthAPI.logout();
        window.location.href = "index.html";
    });
}
