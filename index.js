//Group 4
//ELEMENTS
//CONTAINERS
const eventContainer = document.getElementById('eventList')
const formContainer = document.querySelector('#addEvent')
formContainer.addEventListener("submit", newEvent)

let state = {
    events: []
};

//API URL 
const APIurl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events'

//FETCH EVENTS
async function fetchAPIevents() {
    try {
        const APIresponse = await fetch(APIurl);
        const APIconverted = await APIresponse.json();
        state.events = APIconverted.data
        console.log(state.events)
        return state.events;
    } catch (error) {
        console.log(error);
    }
}

//RENDER ALL EVENTS FROM STATE
function renderEvents() { 

    if (!state.events.length || state.events.length === 0) {
        eventContainer.innerHTML = '<h3>No events found</h3>';
        return;
    }

    const eventInfo = state.events.map((ele, ind) => {
        const event = document.createElement('div')
        event.className = `event`
        event.innerHTML = `
            <h3>Event: ${ele.name}</h3>
            <h4>When: ${ele.date}</h4>
            <h4>Where: ${ele.location}</h4>
            <h4>ID: ${ele.id}</h4>
            <p>Description: <br/>${ele.description}</p>
            `;

//DELETE BUTTON
        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete Event"
        event.append(deleteButton)

        deleteButton.addEventListener("click", () => deleteEvent(ele.id))

        return event;
    })
    eventContainer.replaceChildren(...eventInfo)
}

//INITIALIZATION FOR PAGE LOAD
async function initialize() {
    await fetchAPIevents();
    renderEvents();
}

initialize();

//DELETE
async function deleteEvent(id) {
    try {
        const response = await fetch(`${APIurl}/${id}`, { 
            method: "DELETE",
        })
        initialize()
    } catch (error) {
        console.error(error)
    }
}

//UPDATE NEW EVENTS
async function newEvent(e) {
    e.preventDefault();

    console.log(formContainer.name.value)
    try {
        const response = await fetch(APIurl, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                name: formContainer.name.value,
                date: `${formContainer.date.value}:00.000Z`,
                location: formContainer.location.value, 
                description: formContainer.description.value
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create new event")
        };
        initialize();
    }
    catch (error) {
        console.log(error)
    }
}