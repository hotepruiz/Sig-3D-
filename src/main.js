import * as THREE from 'three';
import { iniciarEscena } from './setup.js'; // Asegurate del .js si usás módulos ES
import cargarModelo from './cargarModelo.js';



// setup
const { scene, camera, renderer, controls } = iniciarEscena();
let mixer;
const clock = new THREE.Clock();

//Cargar escena----------------------------------------------------------------------------
async function agregarModelo() {
  try {
    const gltf = await cargarModelo('/Escena/Escena modificada.glb');
    const modelo = gltf.scene;
    scene.add(modelo);

    modelo.position.set(0, 0, 0);

    // Crear el mixer y reproducir la animación si tiene
    if (gltf.animations.length > 0) {
      console.log("Animaciones disponibles:", gltf.animations);
      mixer = new THREE.AnimationMixer(gltf.scene);
  
      // Elegir la animación por nombre o índice
      const solicitudRoja = mixer.clipAction(gltf.animations[0]); 
      const SolicitudAzul = mixer.clipAction(gltf.animations[1]);
      solicitudRoja.play();
      SolicitudAzul.play();
    } 
    else {
      console.warn("El modelo no tiene animaciones.");
    } 
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
  }
}
agregarModelo();


// Loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
