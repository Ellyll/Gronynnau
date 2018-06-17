"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const height = canvas.height = window.innerHeight;
    const width = canvas.width = window.innerWidth;

    const maxParticles = 2000;
    const maxLifespan = 10000;

    const initialVelocityFunc = () => [25-Math.random()*50,-10-Math.random()*100];
    const initialAccelerationFunc = () => [0,Math.random()*4];
    const initialLifespanFunc = () => maxLifespan*Math.random();

    const images = [
            'smoke1.png',
            'smoke2.png'
        ].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
    const maxImageScale = 5;

    const particleSystem = gronynnau();

    particleSystem.addEmitter(
        width/2,
        height,
        initialVelocityFunc,
        initialAccelerationFunc,
        initialLifespanFunc,
        maxParticles,
        maxLifespan,
        images,
        maxImageScale,
        context);

    /*
        Thanks to the following sites for pointers on smoke effects:
        https://www.html5canvastutorials.com/advanced/html5-canvas-realistic-smoke-effect/ (image source appears to be missing)
        http://astronautz.com/wordpress/creating-realistic-particle-effect-with-html5-canvas/ (for one of my smoke images I modified the smoke image from this pages)
     */
});