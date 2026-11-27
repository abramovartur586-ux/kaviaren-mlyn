// Mobilná navigácia

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Zatvoriť navigáciu" : "Otvoriť navigáciu"
        );

    });

}


// Prepínanie kategórií menu

const filterButtons = document.querySelectorAll(".filter-btn");
const menuGroups = document.querySelectorAll(".menu-group");

function showCategory(category) {

    filterButtons.forEach(button => {

        const isActive = button.dataset.category === category;

        button.classList.toggle("active", isActive);

        button.setAttribute("aria-pressed", String(isActive));

    });

    menuGroups.forEach(group => {

        group.hidden = group.dataset.menu !== category;

    });

}

if (filterButtons.length > 0) {

    showCategory("coffee");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            showCategory(button.dataset.category);

        });

    });

}