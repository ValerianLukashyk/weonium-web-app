import * as THREE from 'three'

export function loadGLTFModel(scene, width, height, material) {
    return new Promise(
        (resolve, reject) => {
            const boxGeo = new THREE.BoxGeometry(
                width,
                width,
                width,
                32,
                32,
                32
            )
            const sphereGeo = new THREE.SphereGeometry(275, 64, 64)
            // const copyMaterial = material.copy()
            const box = new THREE.Points(boxGeo, material)
            // box.position.z = 2000
            const sphere = new THREE.Points(sphereGeo, material)
            // sphere.visible = false
            sphere.scale.set(0, 0, 0)

            scene.add(box)
            scene.add(sphere)
            resolve(sphere)
        },
        undefined,
        function (error) {
            reject(error)
        }
    )
}
