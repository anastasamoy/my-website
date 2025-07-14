// Загрузка мероприятий из JSON
async function loadEvents() {
    try {
        const response = await fetch('../data/events.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const eventsData = await response.json();

        return eventsData.map(event => ({
            ...event,
            date: new Date(event.date)
        }));
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

// Текущая дата
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM элементы
const calendarDays = document.getElementById('calendar-days');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const eventList = document.getElementById('event-list');
const eventModal = document.getElementById('event-modal');
const closeModal = document.querySelector('.close-modal');

// Инициализация календаря
async function initCalendar() {
    const events = await loadEvents();

    updateCalendar(events);
    renderUpcomingEvents(events);

    // Навигация по месяцам
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(events);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(events);
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });
}

// Обновление календаря
function updateCalendar(events) {
    const monthNames = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún",
        "Júl", "August", "September", "Október", "November", "December"];
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    calendarDays.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    // Пустые дни
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDay);
    }

    // Дни месяца
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-day', 'current-month');
        day.textContent = i;

        // Сегодняшний день
        const today = new Date();
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            day.classList.add('today');
        }

        // События
        const dayEvents = events.filter(event =>
            event.date.getDate() === i &&
            event.date.getMonth() === currentMonth &&
            event.date.getFullYear() === currentYear
        );

        if (dayEvents.length > 0) {
            day.classList.add('has-event');
            day.addEventListener('click', () => showEventDetails(dayEvents[0]));
        }

        calendarDays.appendChild(day);
    }
}

// Отображение предстоящих событий
function renderUpcomingEvents(events) {
    eventList.innerHTML = '';

    const sortedEvents = [...events].sort((a, b) => a.date - b.date);
    const upcomingEvents = sortedEvents.filter(event => event.date >= new Date());
    const eventsToShow = upcomingEvents.slice(0, 5);

    eventsToShow.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.addEventListener('click', () => showEventDetails(event));

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún",
            "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"];
        const eventDate = `${event.date.getDate()}. ${monthNames[event.date.getMonth()]}`;

        eventItem.innerHTML = `
            <p class="event-date">${eventDate}</p>
            <h4 class="event-title">${event.title}</h4>
            <p class="event-time">${event.time}</p>
        `;

        eventList.appendChild(eventItem);
    });
}

// Показать детали события
function showEventDetails(event) {
    document.getElementById('modal-title').textContent = event.title;

    const monthNames = ["Januára", "Februára", "Marca", "Apríla", "Mája", "Júna",
        "Júla", "Augusta", "Septembra", "Októbra", "Novembra", "Decembra"];
    const eventDate = `${event.date.getDate()}. ${monthNames[event.date.getMonth()]} ${event.date.getFullYear()}`;

    document.getElementById('modal-data').textContent = `Dátum: ${eventDate}`;
    document.getElementById('modal-time').textContent = `Čas: ${event.time}`;
    document.getElementById('modal-location').textContent = `Miesto: ${event.location}`;
    document.getElementById('modal-description').innerHTML = `<p>${event.description}</p>`;

    eventModal.style.display = 'flex';
}
// В функции initCalendar() добавьте:
prevMonthButton.addEventListener('mouseenter', () => {
    prevMonthButton.style.backgroundColor = '#f2f2f2';
});
prevMonthButton.addEventListener('mouseleave', () => {
    prevMonthButton.style.backgroundColor = 'transparent';
});

nextMonthButton.addEventListener('mouseenter', () => {
    nextMonthButton.style.backgroundColor = '#f2f2f2';
});
nextMonthButton.addEventListener('mouseleave', () => {
    nextMonthButton.style.backgroundColor = 'transparent';
});
// Инициализация
document.addEventListener('DOMContentLoaded', initCalendar);