// Timer functionality for countdown
document.addEventListener("DOMContentLoaded", function () {
  // Set initial time (30 minutes in seconds)
  let totalSeconds = 30 * 60;

  // Get all timer elements
  const timers = document.querySelectorAll(".timer");

  function updateTimers() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    timers.forEach((timer) => {
      timer.textContent = timeString;
    });

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      // Reset timer when it reaches 0
      totalSeconds = 30 * 60;
    }
  }

  // Update every second
  setInterval(updateTimers, 1000);

  // Initial update
  updateTimers();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".product-card, .ingredient-card, .benefit-card, .bonus-card, .testimonial-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

// Header
function getOrdinal(day) {
  if (day > 3 && day < 21) return day + "th";
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}

// Ultimos 3 dias no Header
function getLastDays(count) {
  const dates = [];

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d);
  }

  return dates;
}

function getOrdinal(n) {
  if (n > 3 && n < 21) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

const last3Days = getLastDays(3);

const monthName = last3Days[0].toLocaleString("en-US", { month: "long" });

const daysFormatted = last3Days.map((d) => getOrdinal(d.getDate()));

document.getElementById("discountText").innerHTML = `
  <span>🎉 60% Discount</span> Available only on ${monthName}
  ${daysFormatted[0]}, ${daysFormatted[1]} and ${daysFormatted[2]}.
`;
