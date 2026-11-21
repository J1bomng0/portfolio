const modal = document.querySelector("#gallery-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
const closeButton = document.querySelector(".gallery-close");

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalImage.alt = image.alt;

        modalCaption.innerText = image
            .closest(".gallery-item")
            .querySelector("figcaption")
            .innerText;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

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