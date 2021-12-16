import * as THREE from 'three'

export const loadRipples = (
    scene,
) => {
    return new Promise((resolve, reject) => {
        // const boxGeo = new THREE.BoxBufferGeometry(2, 2, 2, 32, 32, 32)
        const geometry = new THREE.PlaneGeometry(64, 64, 1, 1);

        const max = 50
        const meshes = []

        for (let i = 0; i < max; i++) {
            let m = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('/texture/burash01.png'),
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                depthWrite: false,
            })

            let mesh = new THREE.Mesh(geometry, m)
            mesh.visibility = false
            mesh.rotation.z = Math.PI * Math.random()
            scene.add(mesh)
            meshes.push(mesh)
            // meshesState.push(mesh)
        }

        resolve(meshes)
    },
        undefined,
        function (error) {
            reject(error)
        }
    )
}
