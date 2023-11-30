//Group 4
const cohort = "2310-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events");

async function render() {
    await getEvents();
    renderEvents();
};
render();

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
        return json;
    } catch (error) {
        console.error(error);
    }
};

function renderEvents() {
    if (!state.events.length) {
        eventList.innerHTML = "<li>No Events.</li>";
        return;
    }
    const eventInfo = state.events.map((evnt) => {
        const li = document.createElement("li");
        li.innerHTML = `<h2>${evnt.name}</h2>
     <p>Date & Time: ${evnt.date}</p><p>Location: ${evnt.location}</p>
        <p>${evnt.description}</p>`;
        return li;
    });
    eventList.replaceChildren(...eventInfo);
}