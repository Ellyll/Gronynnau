"use strict";

function gronynnau() {
    function getNewParticle(options) {
        const image = options.images[Math.floor(Math.random()*options.images.length)];
        return {
            x: options.x,
            y: options.y,
            velocity: options.initialVelocityFunc(),
            acceleration: options.initialAccelerationFunc(),
            lifespan: options.initialLifespanFunc(),
            image
        };
    }

    function updateParticles(dt, particles, options) {
        const dts = dt / 1000; // convert to seconds
        const newParticles = particles
            .map(p => ({
                x: p.x + (p.velocity[0]*dts),
                y: p.y + (p.velocity[1]*dts),
                velocity: [ p.velocity[0] + (p.acceleration[0]*dts), p.velocity[1] + (p.acceleration[1]*dts) ],
                acceleration: p.acceleration,
                lifespan: p.lifespan - dt,
                image: p.image
            }))
            .filter(p => p.lifespan > 0);

        for (let i=newParticles.length ; i<= options.maxNumberOfParticles ; i++) {
            if (Math.random() <= 0.03)
                newParticles.push(getNewParticle(options));
        }

        return newParticles;
    }

    function renderParticles(particles, options) {
        const context = options.context;

        function renderParticle(p) {
            const a = p.lifespan / options.maxLifespan;
            context.globalAlpha = a;
            const imgScale = (1-a)*options.maxImageScale;
            context.drawImage(p.image, p.x, p.y, p.image.width*imgScale, p.image.height*imgScale);
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        particles.forEach(p=> renderParticle(p));

        const text = particles.length;
        context.globalAlpha = 1.0;
        context.beginPath();
        context.strokeStyle = '#AAA';
        context.strokeText(text, 25, 25);
        context.stroke();
        context.fillStyle = '#FFF';
        context.fillText(text, 25, 25);
        context.fill();
    }

    function animate(currentTime, previousTime, particles, options) {
        const newParticles = previousTime === null
            ? particles
            : updateParticles(currentTime - previousTime, particles, options);


        renderParticles(newParticles, options);
        window.requestAnimationFrame(t => animate(t, currentTime, newParticles, options));
    }

    function addEmitter(x, y,
                        initialVelocityFunc,
                        initialAccelerationFunc,
                        initialLifespanFunc,
                        maxNumberOfParticles,
                        maxLifespan,
                        images,
                        maxImageScale,
                        context) {
        const options = {
            x, y,
            initialVelocityFunc,
            initialAccelerationFunc,
            initialLifespanFunc,
            maxNumberOfParticles,
            maxLifespan,
            images,
            maxImageScale,
            context
        };
        const particles = [];

        window.requestAnimationFrame(t => animate(t, null, particles, options));
    }

    return {
        addEmitter
    }
}