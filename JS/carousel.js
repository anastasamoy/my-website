document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/data/team-data.json');
        const data = await response.json();
        const carousel = document.getElementById('team-carousel');

        // Очищаем карусель перед добавлением
        carousel.innerHTML = '';

        // Создаем клоны первых двух элементов для бесшовной прокрутки
        const teamMembers = [...data.team, ...data.team.slice(0, 2)];

        teamMembers.forEach((member, index) => {
            const memberHtml = `
                <div class="team-member" data-index="${index}">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p class="position">${member.position}</p>
                </div>
            `;
            carousel.innerHTML += memberHtml;
        });

        // Настройки карусели
        const itemWidth = carousel.querySelector('.team-member').offsetWidth;
        let currentIndex = 0;
        const visibleItems = 3;
        const autoScrollDelay = 3000; // 3 секунды

        // Функция для плавной прокрутки
        function scrollToItem(index) {
            currentIndex = index;
            const scrollPosition = index * itemWidth;
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        // Автоматическая прокрутка
        let autoScroll = setInterval(() => {
            currentIndex = (currentIndex + 1) % data.team.length;
            scrollToItem(currentIndex);
        }, autoScrollDelay);

        // Пауза при наведении
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
        });

        // Возобновление при уходе курсора
        carousel.addEventListener('mouseleave', () => {
            autoScroll = setInterval(() => {
                currentIndex = (currentIndex + 1) % data.team.length;
                scrollToItem(currentIndex);
            }, autoScrollDelay);
        });

    } catch (error) {
        console.error('Error loading team carousel:', error);
        const carousel = document.getElementById('team-carousel');
        if (carousel) {
            carousel.innerHTML = '<p class="error">Nepodarilo sa načítať údaje o tíme</p>';
        }
    }
});