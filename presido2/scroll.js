//hamburger edits
 
 function Showsidebar() {
    const sidebar = document.querySelector('.sidebar');
    const links = sidebar.querySelectorAll('a');

    sidebar.style.display = 'flex';

    // Add event listener to each link to hide sidebar on click
    links.forEach(link => {
        link.addEventListener('click', Hidesidebar);
    });
}
        function Hidesidebar() {
            const sidebar = document.querySelector('.sidebar')
            sidebar.style.display = 'none'

        }
        

//idk animation
const scrollers = document.querySelectorAll(".scroller");


if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

//form js
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

//typing effects
const texts = ["ROBOTICS ENGINEER STUDENT", "A LEADER", "A PROBLEM SOLVER"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let isDeleting = false;
    const speed = 120; // typing speed in ms
    const pause = 1500; // pause before deleting

    function type() {
      const fullText = texts[count % texts.length];

      if (isDeleting) {
        currentText = fullText.substring(0, index--);
      } else {
        currentText = fullText.substring(0, index++);
      }

      document.getElementById("typing").textContent = currentText;

      if (!isDeleting && index === fullText.length + 1) {
        isDeleting = true;
        setTimeout(type, pause);
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        count++;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? speed / 2 : speed);
      }
    }
type();





