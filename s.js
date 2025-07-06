tsParticles.load("particles-js", {
    particles: {
        number: { value: 120 },
        color: {
            value: ["#88ccff", "#9966ff"], // Голубой ↔ Фиолетовый
            animation: {
                enable: true,
                speed: 10,
                sync: true // Все точки одновременно меняют цвет
            }
        },
        shape: { type: "circle" },
        size: {
            value: { min: 2, max: 4 }
        },
        opacity: {
            value: 0.6
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" }
        }
    },
    background: {
        color: "#000000"
    },
    fullScreen: { enable: false },
    detectRetina: true
});
