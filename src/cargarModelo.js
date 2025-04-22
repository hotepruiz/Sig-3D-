import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function cargarModelo(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        resolve(gltf);  // <-- devuelve el objeto completo, no solo la escena.
      },
      undefined,
      (error) => {
        console.error('Error cargando el modelo:', error);
        reject(error);
      }
    );
  });
}
