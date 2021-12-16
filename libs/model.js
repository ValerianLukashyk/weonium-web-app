import * as THREE from 'three'



export function loadGLTFModel(
    scene,
    gpuCompute,
    dtPosition,
    material,
) {
    const initGPGPU = (facePos, faceNumb) => {
        fillPosition(faceNumb, facePos)
        gpuCompute.init();

    }

    const fillPosition = (faceNumb, facePos) => {
        let arr = dtPosition.image.data
        for (let i = 0; i < arr.length; i = i + 4) {
            let rand = Math.floor(Math.random() * faceNumb)

            let x = facePos[3 * rand]
            let y = facePos[3 * rand + 1]
            let z = facePos[3 * rand + 2]

            arr[i] = x
            arr[i + 1] = y
            arr[i + 2] = z
            arr[i + 3] = 1
        }

    }
    return new Promise((resolve, reject) => {
        const boxGeo = new THREE.BoxBufferGeometry(500, 500, 500, 32, 32, 32)
        const sphereGeo = new THREE.SphereBufferGeometry(275, 64, 64)
        // const copyMaterial = material.copy()
        const box = new THREE.Points(boxGeo, material)
        const sphere = new THREE.Points(sphereGeo, material)
        // sphere.visible = false
        sphere.scale.set(0, 0, 0)
        // sphere.visible = false

        // box.scale.set(1, 1, 1)
        const facePos1 = box.geometry.attributes.position.array
        const facePos2 = sphere.geometry.attributes.position.array
        const facePos = new Float32Array(
            facePos1.length + facePos2.length
        )
        facePos.set(facePos1)
        facePos.set(facePos2, facePos1.length)

        const faceNumb = facePos.length / 3

        initGPGPU(facePos, faceNumb)


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
