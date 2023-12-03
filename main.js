const houseUrl = "https://api.gameofthronesquotes.xyz/v1/houses";
const personUrl = "https://api.gameofthronesquotes.xyz/v1/characters";
const quoteUrl = "https://api.gameofthronesquotes.xyz/v1/quotes";

// Function to fetch and display houses
function fetchAndDisplayHouses() {
    fetch(houseUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const houseList = document.querySelector("#houses ul");

            data.forEach((house) => {
                const houseItem = createHouseItem(house);
                houseList.appendChild(houseItem);
            });

            addHouseLinksEventListeners(data);
        });
}

// Function to create a house item
function createHouseItem(house) {
    const houseItem = document.createElement("li");
    houseItem.innerHTML = `
        <a href="#${house.slug}">
            <img src="./img/${house.slug}.png" alt="">
            ${house.name.slice(6, house.name.length)}
        </a>`;
    return houseItem;
}

// Function to add event listeners to house links
function addHouseLinksEventListeners(data) {
    const houseLinks = document.querySelectorAll("#houses ul li a");
    houseLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = link.getAttribute("href").slice(1);
            console.log(slug);
            const house = data.find((house) => house.slug === slug);
            console.log(house);
            displayPersons(house);
        });
    });
}

// Function to fetch and display persons
function displayPersons(house) {
    const personList = document.querySelector("#persons ul");
    personList.innerHTML = `
        <h3 class="house-name">${house.name}</h3>
        <ul class="house-person">
            ${house.members
                .map(
                    (member) => `
                        <li>
                            <a href="#${member.slug}">${member.name}</a>
                        </li>
                    `
                )
                .join("")}
        </ul>
        <a href="#persons" class="see-all-btn">See all characters</button>
    `;

    // Scroll until persons section
    const personsSection = document.querySelector("#persons");
    personsSection.scrollIntoView({
        behavior: "smooth",
    });

    const seeAllBtn = document.querySelector(".see-all-btn");

    seeAllBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const personList = document.querySelector("#persons ul");

        personList.scrollIntoView({
            behavior: "smooth",
        });

        fetchAndDisplayPersons();
    });
}

// Function to fetch and display persons
function fetchAndDisplayPersons() {
    fetch(personUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const personList = document.querySelector("#persons ul");

            data.forEach((person) => {
                const personItem = createPersonItem(person);
                personList.appendChild(personItem);
            });
        });
}

// Function to create a person item
function createPersonItem(person) {
    const personItem = document.createElement("li");
    personItem.innerHTML = `<a href="#${person.slug}">${person.name}</a>`;
    return personItem;
}

// Function to fetch and display quotes
function fetchAndDisplayQuotes() {
    fetch(quoteUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const quoteList = document.querySelector("#quotes ul");

            data.forEach((quote) => {
                const quoteItem = createQuoteItem(quote);
                quoteList.appendChild(quoteItem);
            });
        });
}

// Function to create a quote item
function createQuoteItem(quote) {
    const quoteItem = document.createElement("li");
    quoteItem.innerHTML = `<a href="#${quote.slug}">${quote.name}</a>`;
    return quoteItem;
}

// Add a modal to show quotes on click in each person through the slug in the API

// Initial function calls
fetchAndDisplayHouses();
fetchAndDisplayPersons();
fetchAndDisplayQuotes();
