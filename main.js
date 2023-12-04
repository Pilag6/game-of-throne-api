// ---------
// API URLS
// ---------

const houseUrl = "https://api.gameofthronesquotes.xyz/v1/houses";
const personUrl = "https://api.gameofthronesquotes.xyz/v1/characters";
const quoteUrl = "https://api.gameofthronesquotes.xyz/v1/random/5";
const authorUrl = "https://api.gameofthronesquotes.xyz/v1/authors";

// ------------------------
// Fetch and Display Houses
// ------------------------

function fetchAndDisplayHouses() {
    fetch(houseUrl)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const houseList = document.querySelector("#houses ul");

            data.forEach((house) => {
                const houseItem = createHouseItem(house);
                houseList.appendChild(houseItem);
            });

            addHouseLinksEventListeners(data);
        });
}

// -----------------
// Create House Item
// -----------------

function createHouseItem(house) {
    const houseItem = document.createElement("li");
    houseItem.innerHTML = `
        <a href="#${house.slug}">
            <img src="./img/${house.slug}.png" alt="">
            ${house.name.slice(6, house.name.length)}
        </a>`;
    return houseItem;
}

// ----------------------------------
// Add Event Listeners to House Links
// ----------------------------------

function addHouseLinksEventListeners(data) {
    const houseLinks = document.querySelectorAll("#houses ul li a");
    houseLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = link.getAttribute("href").slice(1);
            const house = data.find((house) => house.slug === slug);

            const personList = document.querySelector("#persons");
            personList.innerHTML = `
            <h2 class="house-name-person">Persons</h2>
            <h3 class="house-name">${house.name}</h3>
            <ul class="house-person">
                ${house.members
                    .map(
                        (member) => `
                            <li style="background-image: url(./img/characters/${member.slug}.jpg);">
                                <a href="#${member.slug}">${member.name}</a>
                            </li>
                        `
                    )
                    .join("")}
            </ul>
            `;

            displayPersons(house);
        });
    });
}

// -------------------------
// Fetch and Display Persons
// -------------------------

function fetchAndDisplayPersons() {
    fetch(personUrl)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const personList = document.querySelector("#all-characters");

            data.forEach((person) => {
                const personItem = createPersonItem(person);
                personList.appendChild(personItem);
            });

            addPersonLinksEventListeners(data);
        });
}

// -----------------
// Create Person Item
// -----------------

function createPersonItem(person) {
    const personItem = document.createElement("div");
    personItem.innerHTML = `
        <ul>
            <li style="background-image: url(./img/characters/${person.slug}.jpg)">
                <a href="#${person.slug}" >
                    ${person.name}
                </a>
            </li>
        </ul>`;
    return personItem;
}

// ----------------------------------
// Add Event Listeners to Person Links
// ----------------------------------

function addPersonLinksEventListeners(data) {
    const personLinks = document.querySelectorAll("#all-characters ul li a");
    personLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = link.getAttribute("href").slice(1);
            // console.log(slug);
            const person = data.find((person) => person.slug === slug);
            console.log(person);
            displayPersonDetails(person);
        });
    });
}

// -----------------
// Display Persons
// -----------------

function displayPersons(house) {
    const personLinks = document.querySelectorAll("#persons ul li a");
    personLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = link.getAttribute("href").slice(1);
            // console.log(slug);
            const person = house.members.find((member) => member.slug === slug);
            console.log(person);
            displayPersonDetails(person);
        });
    });

    // Scroll until persons section
    const personsSection = document.querySelector("#persons");
    personsSection.scrollIntoView({
        behavior: "smooth",
    });
}

// ----------------------
// Display Person Details
// ----------------------

function displayPersonDetails(person) {
    fetch(personUrl)
        .then((response) => response.json())
        .then((data) => {
            const personQuotes = data.filter(
                (quote) => quote.slug === person.slug
            );
            console.log("Person Quotes", personQuotes[0].quotes);

            // Display the person details

            const personDetails = document.querySelector("#person-details");

            personDetails.innerHTML = `
                    <div class="person-details-container">
                        <h2 class="person-details-name">${person.name}</h2>
                        <article>
                            <img src="./img/characters/${
                                person.slug
                            }.jpg" alt="">
                            <div class="person-quotes">
                                <ul>
                                <i class="fa-solid fa-quote-left"></i>${
                                    personQuotes[0].quotes[
                                        Math.floor(
                                            Math.random() *
                                                personQuotes[0].quotes.length
                                        )
                                    ]
                                }
                                    <i class="fa-solid fa-quote-right"></i>
                                    
                                </ul>
                                <button class="btn-other-quotes">Other Quotes <i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </article>
                    </div>
            `;

            // Add event listener to the button
            const btnOtherQuotes = document.querySelector(".btn-other-quotes");
            btnOtherQuotes.addEventListener("click", () => {
                const personDetails =
                    document.querySelector(".person-quotes ul");
                personDetails.innerHTML = `
            <i class="fa-solid fa-quote-left"></i>${
                personQuotes[0].quotes[
                    Math.floor(Math.random() * personQuotes[0].quotes.length)
                ]
            }
            <i class="fa-solid fa-quote-right"></i>
        `;
            });
        })
        .catch((error) => {
            console.error(error);
        });

    // Scroll until persons section
    const personDetailsName = document.querySelector("#person-details");
    personDetailsName.scrollIntoView({
        behavior: "smooth",
    });
}

// -------------------------
//  Fetch and Display Quotes
// -------------------------

function fetchAndDisplayQuotes() {
    fetch(quoteUrl)
        .then((response) => response.json())
        .then((data) => {
            const quoteList = document.querySelector("#quotes");
            quoteList.innerHTML = "";

            data.forEach((quote) => {
                const quoteItem = createQuoteItem(quote);
                quoteList.appendChild(quoteItem);
            });
        });
}

// ---------------------
// Create Quote Item
// ---------------------

function createQuoteItem(quote) {
    const quoteItem = document.createElement("div");
    quoteItem.innerHTML = `
        <ul>
            <li>
                <h4>${quote.character.name}</h4>
                <p><i class="fa-solid fa-quote-left"></i>${quote.sentence}<i class="fa-solid fa-quote-right"></i></p>
            </li>
        </ul>`;
    return quoteItem;
}

// ---------------------
// Display Random Quotes
// ---------------------

function displayRandomQuotes() {
    fetchAndDisplayQuotes();
}

// ------------------------------------------
// Add Event Listener to Random Quotes Button
// ------------------------------------------

const btnRandom = document.querySelector("#btn-random");

btnRandom.addEventListener("click", displayRandomQuotes);

// ------------------------
// Initial Fetch and Display
// ------------------------

fetchAndDisplayHouses();
fetchAndDisplayPersons();
fetchAndDisplayQuotes();
