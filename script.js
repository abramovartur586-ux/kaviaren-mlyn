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
// Rezervacny formular

const reservationForm = document.getElementById("reservation-form");

if (reservationForm) {

    const dateInput = document.getElementById("datum");
    const timeInput = document.getElementById("cas");
    const status = document.getElementById("reservation-status");

    function localDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    dateInput.min = localDate(new Date());

    function validateReservationTime() {

        timeInput.setCustomValidity("");

        if (!dateInput.value || !timeInput.value) return;

        const selected = new Date(
            `${dateInput.value}T${timeInput.value}`
        );

        const weekday = selected.getDay();

        const opening = weekday === 0 ? "09:00" :
                        weekday === 6 ? "08:00" : "07:30";

        const closing = weekday === 0 ? "17:00" :
                        weekday === 6 ? "18:00" : "19:00";

        if (selected <= new Date()) {
            timeInput.setCustomValidity(
                "Vyberte dátum a čas v budúcnosti."
            );
        } else if (
            timeInput.value < opening ||
            timeInput.value >= closing
        ) {
            timeInput.setCustomValidity(
                `Otváracie hodiny: ${opening} – ${closing}.`
            );
        }
    }

    dateInput.addEventListener("input", validateReservationTime);
    timeInput.addEventListener("input", validateReservationTime);

    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        validateReservationTime();

        if (!reservationForm.reportValidity()) return;

        const name = document.getElementById("meno").value;
        const date = dateInput.value.split("-").reverse().join(".");
        const time = timeInput.value;
        const people = document.getElementById("osoby").value;

        status.textContent =
            `Ďakujeme, ${name}! Ukážková požiadavka na ${date} o ${time} ` +
            `pre ${people} osôb bola spracovaná. ` +
            `Nejde o skutočnú rezerváciu.`;

        reservationForm.reset();
        timeInput.setCustomValidity("");

    });
}


// Objednavka zrnkovej kavy

const orderForm = document.getElementById("order-form");

if (orderForm) {

    const productSelect = document.getElementById("order-product");
    const quantityInput = document.getElementById("order-quantity");
    const totalElement = document.getElementById("order-total");
    const orderStatus = document.getElementById("order-status");

    const coffeePrices = {
        "Mlyn Blend": 1090,
        "Etiópia": 1290,
        "Brazília": 1190
    };

    const currency = new Intl.NumberFormat("sk-SK", {
        style: "currency",
        currency: "EUR"
    });

    function updateTotal() {

        const quantity = quantityInput.valueAsNumber;

        if (!Number.isInteger(quantity) ||
            quantity < 1 || quantity > 20) {

            totalElement.textContent = "—";
            return null;

        }

        const price = coffeePrices[productSelect.value];
        const total = price * quantity / 100;

        totalElement.textContent = currency.format(total);

        return total;

    }

    document.querySelectorAll(".order-btn").forEach(button => {

        button.addEventListener("click", () => {

            productSelect.value = button.dataset.product;
            orderStatus.textContent = "";

            updateTotal();

        });

    });

    productSelect.addEventListener("change", updateTotal);
    quantityInput.addEventListener("input", updateTotal);

    orderForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!orderForm.reportValidity()) return;

        const total = updateTotal();

        if (total === null) return;

        const name = document.getElementById("order-name").value;
        const product = productSelect.value;
        const quantity = quantityInput.value;

        orderStatus.textContent =
            `Ďakujeme, ${name}! ` +
            `Ukážková objednávka: ${product}, ${quantity} bal. ` +
            `Celková cena: ${currency.format(total)}. ` +
            `Nejde o skutočnú objednávku.`;

        orderForm.reset();
        updateTotal();

    });

    updateTotal();

}

