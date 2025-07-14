
    tsParticles.load("particles", {
    fullScreen: { enable: false },
    background: {
    color: "#0b0b0e"
},
    particles: {
    number: {
    value: 150
},
    color: {
    value: ["#129dff", "#9555ff"]
},
    shape: {
    type: "circle"
},
    opacity: {
    value: 0.8,
    random: true
},
    size: {
    value: { min: 2, max: 4 }
},
    move: {
    enable: true,
    speed: 1.5,
    random: true,
    straight: false,
    outModes: {
    default: "bounce"
}
},
    links: {
    enable: true,
    distance: 200,
    color: "#ffffff",
    opacity: 0.3,
    width: 1,
    triangles: {
    enable: false
}
}
},
    interactivity: {
    detectsOn: "canvas",
    events: {
    onHover: {
    enable: true,
    mode: "attract"
}
},
    modes: {
    attract: {
    distance: 150,
    duration: 0.4,
    factor: 3
}
}
},
    manualParticles: [
{
    position: { x: 70, y: 50 },
    options: {
    color: { value: "rgba(255,255,255,0.48)" },
    links: {
    enable: true,
    distance: 200,
    color: "rgba(255,255,255,0.58)",
    opacity: 0.6,
    width: 1.5
},
    move: {
    enable: false
},
    size: {
    value: 6
},
    opacity: {
    value: 1
},
    shape: {
    type: "circle"
}
}
}
    ],
    detectRetina: true
});
