
    // Импорт Firebase SDK
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
    import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

    // Конфигурация из Firebase
    const firebaseConfig = {
    apiKey: "AIzaSyDI6SeoOGMvf1pmYVhbFTAnrwOtgruvmGI",
    authDomain: "agentkovac.firebaseapp.com",
    projectId: "agentkovac",
    storageBucket: "agentkovac.firebasestorage.app",
    messagingSenderId: "276041954237",
    appId: "1:276041954237:web:fbdf61d4c04a1219e458d4"
};

    // Инициализация Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Обработчики
    window.registerUser = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
    await createUserWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, (user) => {
    if (user) {
    window.location.href = "/index.html";
}
});
} catch (error) {
    document.getElementById("status").innerText = "Error: " + error.message;
}
};
    // Toggle password visibility
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    window.loginUser = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
    await signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, (user) => {
    if (user) {
    window.location.href = "/index.html";
}
});
} catch (error) {
    document.getElementById("status").innerText = "Error: " + error.message;
}
};

    window.switchToRegister = () => {
    document.querySelector('.greeting').textContent = 'Welcome!';
    document.querySelector('.auth-title').textContent = 'Vytvoriť nové konto';
    document.querySelector('.auth-button').textContent = 'VYTVORIŤ';
    document.querySelector('.switch-auth').innerHTML = 'Už máte účet? <a href="#" onclick="switchToLogin()">Prihlásiť sa</a>';
    document.querySelector('.auth-button').onclick = registerUser;
    return false;
};

    window.switchToLogin = () => {
    document.querySelector('.greeting').textContent = 'Hello!';
    document.querySelector('.auth-title').textContent = 'Prihláste sa do svojho konta';
    document.querySelector('.auth-button').textContent = 'PRIHLÁSIŤ SA';
    document.querySelector('.switch-auth').innerHTML = 'Ešte nemáte účet? <a href="#" onclick="switchToRegister()">Vytvoriť</a>';
    document.querySelector('.auth-button').onclick = loginUser;
    return false;
};

    window.logoutUser = async () => {
    await signOut(auth);
    document.getElementById("status").innerText = "You have been signed out";
};

    /*onAuthStateChanged(auth, user => {
    if (user) {
        document.querySelector('.notification-panel').classList.remove('hidden');
        document.querySelector('.bell').classList.remove('hidden');
        document.getElementById("status").innerText = "Signed in as: " + user.email;
        loginButton.textContent = user.email;
} else {
        document.querySelector('.notification-panel').classList.add('hidden');
        document.querySelector('.bell').classList.add('hidden');
        document.getElementById("status").innerText = "";
        loginButton.textContent = 'Prihlásiť sa';
}
});
*/