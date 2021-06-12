import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Loader
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)
let ant = null
gltfLoader.load(
	'/models/ant.glb',
	(gltf) => {
        ant = gltf.scene
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.y += 0.001
		scene.add(gltf.scene);
    }
)
// Objects
const geometry = new THREE.PlaneGeometry(100, 100);

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x00ff00)

// Mesh
const floor = new THREE.Mesh(geometry,material)
floor.rotation.x = - Math.PI / 2
scene.add(floor)

// Lights

const ambientLight = new THREE.AmbientLight(0x404040, 10)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.0001, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

const clock = new THREE.Clock()
let t = 0
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    //update floor
    // floor.position.set(camera.position.x-1, camera.position.y-1, camera.position.z)
    if(ant) {
        t += 0.01
        ant.position.set(20 * Math.cos(t) + 0, 0, 20 * Math.sin(t) + 0)
    }
    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()