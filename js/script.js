// Sample events data with images
const events = [
    { id: 1, name: 'Conference DAR', date: '2024-05-30', category: 'conference', description: 'Pe 30 mai 2024 la Arena Chișinău va avea loc Conferința internațională DAR - Digital transformation • AI and Business Resources.', image: 'images/image1.jpg' },
    { id: 2, name: 'Conference FIC', date: '2024-05-31', category: 'conference', description: 'Și-n acest an, miza Festivalului Industriilor Creative rămâne a fi conferința, cu speakeri atât locali, cât și internaționali - din SUA, Japonia, Marea Britanie, Suedia, Letonia și România.', image: 'images/image2.jpg' },
    { id: 3, name: 'T-FEST', date: '2024-07-27', category: 'music', description: 'Concert of T-Fest', image: 'images/image3.jpg' },
    { id: 4, name: 'Jony', date: '2024-06-02', category: 'music', description: 'Concert of Jony', image: 'images/image4.jpg' },
    { id: 5, name: 'Nistru Fest', date: '2024-08-10', category: 'festival', description: 'Headlinerii sunt Irina Rimes și The Montans, cu încălzirea atmosferei de către Vanotek. Începem la ora 16:00.', image: 'images/image5.jpg' },
    { id: 6, name: 'Furioasa: Saga Mad Max (EN-RO)', date: '2024-05-27', category: 'movie', description: 'In timp ce omenirea e pe cale de dispariție, tânăra Furiosa este răpită din sânul familiei și cade pradă unei bande nemiloase, condusă de Warlord Dementus. Gonind în viteză prin deșert, ei dau peste o așezare subordonată lui Immortan Joe. În timp ce acești doi tirani se luptă pentru putere, Furiosa trebuie să supraviețuiască multor provocări pentru a putea ajunge înapoi acasă.', image: 'images/image6.jpg' },
    { id: 7, name: 'THEATRE on the ROOFTOP', date: '2024-05-30', category: 'culture', description: 'Iusty Art Gallery te invită să descoperi o experiență unică - THEATRE on the ROOFTOP, pe 30 mai 2024 începând cu orele 20:00 un teatru la înălțime!', image: 'images/image7.jpg' },
    { id: 8, name: 'Garfield (RO)', date: '2024-05-27', category: 'movie', description: 'Garfield, faimosul motan de interior, care urăște zilele de luni și iubește lasagna, pornește într-o aventură nebună în aer liber! După o reuniune neașteptată cu tatăl său, ciufulitul motan Vic, care trăiește pe stradă, Garfield și amicul său canin Odie renunță la viața confortabilă de animale de companie pentru a se alătura lui Vic într-un jaf cu mize mari.', image: 'images/image8.jpg' },
];

// Function to display events on the home page
function displayEvents(eventsToDisplay) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    eventsToDisplay.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-4 event-card';
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.name}">
            <h3>${event.name}</h3>
            <p>${event.date}</p>
            <p>${event.category}</p>
            <button class="btn btn-primary" onclick="viewEvent(${event.id})">View Details</button>
        `;
        eventList.appendChild(eventCard);
    });
}
// Function to filter events by category from nav bar
function filterByCategory(category) {
    const filteredEvents = category === 'all' ? events : events.filter(event => event.category === category);
    displayEvents(filteredEvents);
}

// Function to view event details in a modal
function viewEvent(eventId) {
    const event = events.find(event => event.id === eventId);
    if (event) {
        document.getElementById('modalEventName').innerText = event.name;
        document.getElementById('modalEventDate').innerText = event.date;
        document.getElementById('modalEventCategory').innerText = event.category;
        document.getElementById('modalEventDescription').innerText = event.description;
        $('#eventDetailsModal').modal('show');
    }
}

// Function to show sign-in modal
function showSignInModal() {
    $('#signInModal').modal('show');
}

// Function to show register modal
function showRegisterModal() {
    $('#registerModal').modal('show');
}

// Function to handle sign-in
function signIn(username, password) {
    if (users[username] && users[username].password === password) {
        $('#signInModal').modal('hide');
        setUserProfile(username);
    } else {
        alert('Invalid username or password');
    }
}

// Function to handle registration
function register(username, password, birthDate) {
    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = { password, birthDate };
        $('#registerModal').modal('hide');
        setUserProfile(username);
    }
}

// Function to set user profile
function setUserProfile(username) {
    document.getElementById('authButtons').classList.add('d-none');
    document.getElementById('userProfile').classList.remove('d-none');
    document.getElementById('userName').innerText = username;
}

// Function to log off
function logOff() {
    document.getElementById('authButtons').classList.remove('d-none');
    document.getElementById('userProfile').classList.add('d-none');
}

// Function to handle search
function searchEvents(query) {
    const lowerCaseQuery = query.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery) ||
        event.category.toLowerCase().includes(lowerCaseQuery)
    );
    displayEvents(filteredEvents);
}

// Add event listener for search
document.getElementById('search-bar').addEventListener('input', (e) => searchEvents(e.target.value));

// Add event listeners for sign-in and registration forms
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    signIn(username, password);
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const birthDate = document.getElementById('registerBirthDate').value;
    register(username, password, birthDate);
});

// Display events on initial load
document.addEventListener('DOMContentLoaded', () => {
    displayEvents(events);
});