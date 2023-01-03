import './style.css';

import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { color } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GUI } from 'dat.gui';
import { gui } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';

//Import Shaders
import fragment from './shader/fragment.glsl';
import vertex from './shader/vertex.glsl';

//COLORS

let colors = ['#355070', '#6d597a', '#b56576', '#e56b6f', '#eaac8b'];
colors = colors.map((col) => new THREE.Color(col));
console.log(colors);

//Event Listeners

window.addEventListener('resize', (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Setup Scene and Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

camera.position.setZ(5);

//Add a plane
const planeGeo = new THREE.PlaneGeometry(25, 25, 300, 300);
const planeMaterial = new THREE.ShaderMaterial({
    extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uColor: { value: colors },
    },
    //wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment,
});
const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);

scene.add(planeMesh);

//Add Light

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(1, 1, 1);
scene.add(light);
//Render Settings

renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.setSize(window.innerWidth, window.innerHeight);

//Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enabled = false;

let time = 0;

function tick() {
    //camera.updateProjectionMatrix();
    requestAnimationFrame(tick);
    time += 0.05;
    planeMaterial.uniforms.time.value = time;
    controls.update();

    renderer.render(scene, camera);
}

tick();
