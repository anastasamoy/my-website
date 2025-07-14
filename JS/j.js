
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
    import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDI6SeoOGMvf1pmYVhbFTAnrwOtgruvmGI",
    authDomain: "agentkovac.firebaseapp.com",
    projectId: "agentkovac",
    storageBucket: "agentkovac.firebasestorage.app",
    messagingSenderId: "276041954237",
    appId: "1:276041954237:web:fbdf61d4c04a1219e458d4"
};

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const loginButton = document.querySelector('.login');
    const logoutButton = document.querySelector('.logout');
    const bell = document.querySelector('.bell');
    const notificationPanel = document.querySelector('.notification-panel');

    function toggleBell() {
    const bellIcon = bell.querySelector('.bell-icon');
    const bellIconActive = bell.querySelector('.bell-icon-active');

    notificationPanel.classList.toggle('active');

    if (notificationPanel.classList.contains('active')) {
    bellIcon.style.display = 'none';
    if (bellIconActive) bellIconActive.style.display = 'block';
} else {
    bellIcon.style.display = 'block';
    if (bellIconActive) bellIconActive.style.display = 'none';
}
}

    onAuthStateChanged(auth, user => {
    if (user) {
    bell.classList.remove('hidden');
    notificationPanel.classList.remove('hidden');

    bell.onclick = (e) => {
    e.stopPropagation();
    toggleBell();
};

    loginButton.textContent = user.email;
    loginButton.style.cursor = 'pointer';

    loginButton.onclick = (e) => {
    e.stopPropagation();
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};

    logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
    window.location.reload();
});
});

    document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
    document.querySelector('.dropdown').style.display = 'none';
}
    if (!e.target.closest('.bell') && !e.target.closest('.notification-panel')) {
    notificationPanel.classList.remove('active');
    const bellIcon = bell.querySelector('.bell-icon');
    const bellIconActive = bell.querySelector('.bell-icon-active');
    bellIcon.style.display = 'block';
    if (bellIconActive) bellIconActive.style.display = 'none';
}
});
} else {
    bell.classList.add('hidden');
    notificationPanel.classList.add('hidden');

    loginButton.textContent = 'Prihlásiť sa';
    loginButton.onclick = () => window.location.href = '/HTML/register.html';
}
});
