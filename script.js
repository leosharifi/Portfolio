
const revealTargets = document.querySelectorAll(
  ".currentRole, .textOrParagraph, .work-ex-section, .skillCard, .projectBox, .contactInfo, .contactForm"
);
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNavLink = () => {
  const headerOffset = 130;
  const readingLine = window.innerHeight * 0.6;
  const currentSection = navSections.reduce((activeSection, section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= Math.max(headerOffset, readingLine)) {
      return section;
    }

    return activeSection;
  }, navSections[0]);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentSection.id}`);
  });
};

setActiveNavLink();
window.addEventListener("scroll", setActiveNavLink, { passive: true });
window.addEventListener("resize", setActiveNavLink);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
  setTimeout(() => {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }, 1400);
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const form = document.getElementById("contactForm");
const toastArea = document.querySelector(".toastArea");

const showToast = (title, message, type = "success") => {
  if (!toastArea) return;

  const toast = document.createElement("div");
  const iconClass = type === "success" ? "fa-check" : "fa-triangle-exclamation";

  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toastIcon">
      <i class="fa-solid ${iconClass}"></i>
    </div>
    <div>
      <strong>${title}</strong>
      <span>${message}</span>
    </div>
  `;

  toastArea.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 4300);
};

if (form) {
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
          content: `📩 **New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
        }),
      });

      showToast("Message sent", "Thanks for reaching out. I’ll get back to you soon.", "success");
      form.reset();
    } catch (error) {
      console.error("Error sending message to elyas:", error);
      showToast("Message not sent", "Something went wrong. Please try again in a moment.", "error");
    }
  });
}
