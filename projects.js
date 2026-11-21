
const projects = [
    {
        title: "Evrika",
        subtitle: "Edtech web platform",
        image: "assets/evrika.png",
        description: "Designed to make learning history engaging and accessible through interactive timelines, categorized Q&A, search features and more. Built using React, JavaScript, CSS, and Firebase.",
        link: "https://evrika.com.ge/"
    },
    {
        title: "Marvel Mystery",
        subtitle: "AI-powered web game",
        image: "assets/MM.png",
        description: "An interactive Marvel-themed guessing game where players identify mystery characters by asking questions and receiving AI-generated clues. Built using React, JavaScript, Node.js, Express, and Google Gemini AI.",
        link: "https://j1bomng0.github.io/MarvelMystery/"
    },
    {
        title: "Fanduri",
        subtitle: "Interactive Virtual Instrument",
        image: "assets/fanduri.png",
        description: "A web-based Georgian Fanduri simulator that lets users play music using their keyboard. Built with HTML, CSS, and JavaScript.",
        link: "https://j1bomng0.github.io/Fanduri/"
    },
    {
        title: "New Geology",
        subtitle: "Coming soon",
        image: "assets/nn.png",
        description: "A modern, responsive website designed in Figma for a Batumi-based geology company to showcase its services and projects. Tools: Figma (design completed, development in progress)",
        link: ""
    },
    {
        title: "Sufra",
        subtitle: "Restaurant Discovery Platform",
        image: "assets/sufra.png",
        description: "Developed as part of an acceleration program, designed to help users explore and discover restaurants that match their preferences.",
        link: "https://j1bomng0.github.io/Sufra/"
    }
];


const projectWindow = document.getElementById("project-window");

function openProject(index) {

    const project = projects[index];

    document.getElementById("project-path").textContent =
        "c:/Tamar/portfolio/" + project.title;

    document.getElementById("popup-title").textContent =
        project.title;

    document.getElementById("popup-subtitle").textContent =
        project.subtitle;

    document.getElementById("popup-description").textContent =
        project.description;

    const image = document.getElementById("popup-image");

    image.hidden = !project.image;

    if (project.image) {
        image.src = project.image;
    } else {
        image.removeAttribute("src");
    }

    const link = document.getElementById("popup-link");

    link.hidden = !project.link;
    link.href = project.link;
    link.textContent = "Link: " + project.link;

    projectWindow.showModal();
}

document.getElementById("close-project")
    .addEventListener("click", () => {
        projectWindow.close();
    });


// DRAGGABLE FOLDERS

const desktop = document.getElementById("desktop");
const folders = document.querySelectorAll(".desktop-folder");

folders.forEach(folder => {

    let dragging = false;
    let moved = false;

    let startX, startY;
    let initialLeft, initialTop;

    folder.addEventListener("pointerdown", (e) => {

        if (e.button !== 0) return;

        dragging = true;
        moved = false;

        startX = e.clientX;
        startY = e.clientY;

        initialLeft = folder.offsetLeft;
        initialTop = folder.offsetTop;

        folder.setPointerCapture(e.pointerId);
    });

    folder.addEventListener("pointermove", (e) => {

        if (!dragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            moved = true;
        }

        if (!moved) return;

        folder.classList.add("dragging");

        const maxX = Math.max(
            0, desktop.clientWidth - folder.offsetWidth
        );

        const maxY = Math.max(
            0, desktop.clientHeight - folder.offsetHeight
        );

        const newX = Math.max(
            0, Math.min(initialLeft + dx, maxX)
        );

        const newY = Math.max(
            0, Math.min(initialTop + dy, maxY)
        );

        folder.style.left = newX + "px";
        folder.style.top = newY + "px";
    });

    folder.addEventListener("pointerup", () => {
        dragging = false;
        folder.classList.remove("dragging");
    });

    folder.addEventListener("pointercancel", () => {
        dragging = false;
        moved = false;
        folder.classList.remove("dragging");
    });

    folder.addEventListener("click", (e) => {

        if (!moved || e.detail === 0) {
            openProject(Number(folder.dataset.project));
        }

        moved = false;
    });

});


// KEEP FOLDERS INSIDE THE DESKTOP WHEN RESIZING

window.addEventListener("resize", () => {

    folders.forEach(folder => {

        const maxX = Math.max(
            0, desktop.clientWidth - folder.offsetWidth
        );

        const maxY = Math.max(
            0, desktop.clientHeight - folder.offsetHeight
        );

        folder.style.left =
            Math.min(Math.max(0, folder.offsetLeft), maxX) + "px";

        folder.style.top =
            Math.min(Math.max(0, folder.offsetTop), maxY) + "px";
    });

});


// FOOTER CLOCK

function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit"
        }).replaceAll(" ", "-");
}

updateClock();
setInterval(updateClock, 1000);
