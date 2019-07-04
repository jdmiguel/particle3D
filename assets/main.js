(() => {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    const container = document.getElementById('canvas-container');

    const scene = new THREE.Scene();

    // Camera settings
    const camera = new THREE.PerspectiveCamera(20, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
    camera.position.z = 100;
    camera.lookAt(scene.position);

    // renderer 
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // Clock 
    const clock = new THREE.Clock();

    container.appendChild(renderer.domElement);

    // Utils
    const getRandomNumber = base => Math.random() * base - (base / 2);
    const getRandomColor = () => {
        const threeColor = new THREE.Color();
        threeColor.setRGB( Math.random(), Math.random(), Math.random() );
        return threeColor;
    }

    // Init particles
    let particleGroup, emitter = null;
    const numEmitters = 250;

    const initParticles = () => {
        particleGroup = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('./assets/smokeparticle.png'),
            }
        });

        for (let i = 0; i < numEmitters; ++i) {
            emitter = new SPE.Emitter({
                maxAge: 5,
                type: Math.random() * 4 | 0,
                position: {
                    value: new THREE.Vector3(
                        getRandomNumber(200),
                        getRandomNumber(200),
                        getRandomNumber(200)
                    )
                },

                acceleration: {
                    value: new THREE.Vector3(
                        getRandomNumber(-2),
                        getRandomNumber(-2),
                        getRandomNumber(-2)
                    )
                },

                velocity: {
                    value: new THREE.Vector3(
                        getRandomNumber(5),
                        getRandomNumber(5),
                        getRandomNumber(5)
                    )
                },

                rotation: {
                    axis: new THREE.Vector3(
                        getRandomNumber(1),
                        getRandomNumber(1),
                        getRandomNumber(1)
                    ),
                    angle: Math.random() * Math.PI,
                    center: new THREE.Vector3(
                        getRandomNumber(100),
                        getRandomNumber(100),
                        getRandomNumber(100)
                    )
                },

                wiggle: {
                    value: Math.random() * 25
                },

                drag: {
                    value: Math.random()
                },

                color: {
                    value: [getRandomColor(), getRandomColor()]
                },
                size: {
                    value: [0, 2 + Math.random() * 10, 0]
                },

                particleCount: 300,

                opacity: [0, 1, 0]
            });

            particleGroup.addEmitter(emitter);
        }

        scene.add(particleGroup.mesh);
    }

    // Render settings
    const updateCamera = () => {
        let now = Date.now() * 0.0002;
        camera.position.x = Math.sin(now) * 200;
        camera.position.z = Math.cos(now) * 900;
        camera.lookAt(scene.position);
    }

    const render = () => {
        particleGroup.tick(clock.getDelta());
        updateCamera();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    initParticles();
    render();
})();