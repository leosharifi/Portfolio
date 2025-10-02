
const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const webhookURL = "https://discordapp.com/api/webhooks/1423259957062664233/8HOtQaKCIPDUe3tiHsuKD7rdy6FQp3-7wEcnygDB1d2sjm-1hluUU5yQjjJjHe_8peAq"; 

    try {
      await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📩 **New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
        }),
      });

      alert("✅ Your message has been sent!");
      form.reset();
    } catch (error) {
      console.error("Error sending message to elyas:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  });