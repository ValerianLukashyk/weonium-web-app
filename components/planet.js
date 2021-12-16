import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Spinner, Center, useColorModeValue } from '@chakra-ui/react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../libs/model'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
import { fragment } from '../components/Scene/shaders/fragment'
import { vertex } from '../components/Scene/shaders/vertex'
import { fragmentSimulation } from '../components/Scene/shaders/fragmentSimulation'
import { fragment as fr, vertex as vx } from './shaders/shaders'
import gsap from 'gsap'


function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const WIDTH = 1

const settings = {
  pointSize: 300,
  freq: 10,
  ampl: 3,
  maxDist: 2,
  opacity: 1,
  colorProgress: 0,
  color: {
    red: 1,
    green: 1,
    blue: 1,
  }
}

const Planet = () => {

  // set STATE
  const refContainer = useRef()

  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState()
  const [_camera, setCamera] = useState()

  const [target] = useState(new THREE.Vector3(0, 0, 0))
  const [initialCameraPosition] = useState(
    // new THREE.Vector3(20 * Math.sin(0.5 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))

    new THREE.Vector3(0, 300, 1200)
  )
  const [scene] = useState(new THREE.Scene())
  const [scene1] = useState(new THREE.Scene())
  const [scene2] = useState(new THREE.Scene())

  const [_controls, setControls] = useState()

  const [meshes] = useState([])

  const [mat] = useState(new THREE.ShaderMaterial(
    {
      side: THREE.DoubleSide,
      fragmentShader: fr,
      vertexShader: vx,
      uniforms: {
        time: { value: 0 },
        uDisplacement: { value: null },
        uTexture: { value: null },
        resolution: { value: new THREE.Vector4() },
      },
    }
  ))
  const [pointColor] = useState(new THREE.Color(1, 1, 1))
  // const pointColor = useColorModeValue(new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(1, 1, 1, 1))

  const [material] = useState(new THREE.ShaderMaterial(
    {
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        time: { value: 0 },
        pointSize: { value: settings.pointSize },
        opacity: { value: 1 },
        freq: { value: 0 },
        ampl: { value: 0 },
        maxDist: { value: 0 },
        positionTexture: { value: null },
        colorProgress: { value: 0 },
        uColor: { value: { x: 1, y: 1, z: 1 } }
      },
    }
  ))

  const [mouse] = useState(new THREE.Vector2(0, 0))
  const [prevMouse] = useState(new THREE.Vector2(0, 0))

  // const pointColor = useColorModeValue(new THREE.Vector4(0, 0, 0, 1), new THREE.Vector4(1, 1, 1, 1))

  // SET RESIZE FUNCTION
  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)

      const imageAspect = 1080 / 1920;
      let a1; let a2;
      if (scH / scW > imageAspect) {
        a1 = (scW / scH) * imageAspect;
        a2 = 1;
      } else {
        a1 = 1;
        a2 = (scH / scW) / imageAspect;
      }

      mat.uniforms.resolution.value.x = scW;
      mat.uniforms.resolution.value.y = scH;
      mat.uniforms.resolution.value.z = a1;
      mat.uniforms.resolution.value.w = a2;

      _camera.updateProjectionMatrix();
    }
  }, [renderer, _camera, mat])

  // SET MOUSE POSITION TO STATE
  const mouseEvents = (e) => {
    const width = window.innerWidth
    const height = window.innerHeight
    mouse.x = -(e.clientX - width / 2)
    mouse.y = height / 2 - e.clientY - e.view.scrollY

  }

  // SET ANIMATION ON CLICK
  const handleClick = (e) => {
    if (e.type === 'mousedown' || e.type === 'touchstart') {
      gsap.to(scene2.children[0].material.uniforms.uColor.value, {
        x: 0.8,
        y: 1,
        z: 0,
        duration: 0.5,
      })
      gsap.to(scene2.children[0].scale, {

        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      })
      gsap.to(scene2.children[1].scale, {
        // onStart: () => scene2.children[1].visible = true,
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
      })

      // gsap.to(settings, {
      //   // pointSize: 3000,
      //   ampl: 0,
      //   maxDist: 1,
      //   duration: 1,

      // })

    } else if (e.type === 'mouseup' || e.type === 'touchend') {
      gsap.to(scene2.children[0].material.uniforms.uColor.value, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
      })

      gsap.to(scene2.children[0].scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
      })
      gsap.to(scene2.children[1].scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
      })
      // gsap.to(settings, {
      //   freq: 10,
      //   ampl: 3,
      //   maxDist: 2,
      //   duration: 1,
      // })
    }

  }

  // SET ALL TIME ANIMATION
  const frameRender = (time) => {
    scene2.children[0].rotation.y = time / 16;
    scene2.children[1].rotation.y = -time / 16;


  }

  // START EVERYTHING
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      mat.uniforms.resolution.value.x = scW;
      mat.uniforms.resolution.value.y = scH;

      // SET RENDERER
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      // SET RENDER TARGET
      const aTexture = new THREE.WebGLRenderTarget(scW, scH, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })

      // SET RENDER TARGET2
      const bTexture = new THREE.WebGLRenderTarget(scW, scH, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })

      // SET CAMERA
      // const scale = scH * 0.5
      const camera = new THREE.OrthographicCamera(
        scW / -2,
        scW / 2,
        scH / 2,
        scH / -2,
        -200000,
        200000
      )
      camera.position.set(0, 300, 5500)

      camera.lookAt(target)
      setCamera(camera)

      // SET Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enablePan = false
      controls.rotateSpeed = 0
      controls.target = target
      setControls(controls)

      const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer)

      const texture = gpuCompute.createTexture()

      const positionVariable = gpuCompute.addVariable(
        'texturePosition',
        fragmentSimulation,
        texture
      )
      positionVariable.material.uniforms['time'] = { value: 0 }
      positionVariable.wrapS = THREE.RepeatWrapping
      positionVariable.wrapT = THREE.RepeatWrapping



      const geometry = new THREE.PlaneGeometry(64, 64, 1, 1);
      const max = 50
      let req = null
      let frame = 0
      let time = 0
      let currentWave = 0
      let color = {
        red: 1,
        green: 1,
        blue: 1,
      }
      // SET A RIPPLE'S MESHES
      for (let i = 0; i < max; i++) {
        let m = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('/texture/burash01.png'),
          transparent: true,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          depthWrite: false,
        })

        let mesh = new THREE.Mesh(geometry, m)
        mesh.visible = false
        mesh.rotation.z = Math.PI * Math.random()
        scene.add(mesh)
        meshes.push(mesh)
      }

      const geometryFullScr = new THREE.PlaneGeometry(scW, scH, 1, 1);
      scene1.add(new THREE.Mesh(geometryFullScr, mat))

      loadGLTFModel(scene2, gpuCompute, texture, material).then(() => {
        startAnim()
      })

      const startAnim = () => {
        gsap.from(scene2.children[0].scale, {
          y: 0,
          x: 0,
          z: 0,
          delay: 0.3,
          duration: 1.5,
        })
        gsap.from(settings, {
          opacity: 0.05,
          delay: 1.0,
          duration: 1.5,
        })
      }

      const trackRipples = () => {
        trackMousePos()
        meshes.forEach(mesh => {
          if (mesh.visible) {

            mesh.rotation.z += 0.02
            mesh.material.opacity *= 0.96
            if (mesh.material.opacity < 0.002) {
              mesh.visible = false
            }
            mesh.scale.x = 0.969 * mesh.scale.x + 0.05
            // mesh.scale.x = 1.01 * mesh.scale.x
            mesh.scale.y = mesh.scale.x
          }

        })
      }

      const trackMousePos = () => {
        if (Math.abs(mouse.x - prevMouse.x) < 1 || Math.abs(mouse.y - prevMouse.y) < 1) {
        } else {
          setNewWave()
          currentWave = (currentWave + 1) % max
        }
        prevMouse.x = mouse.x
        prevMouse.y = mouse.y
      }

      const setNewWave = () => {
        if (meshes) {

          // console.log(currentWave)
          let m = meshes[currentWave]
          // console.log(m)
          m.visible = true
          m.position.x = mouse.x
          m.position.y = mouse.y
          m.scale.x = m.scale.y = 1.1
          m.material.opacity = 0.6
        }
      }

      const animate = () => {
        req = requestAnimationFrame(animate)
        time += 0.01
        frame = frame <= 200 ? frame + 1 : frame
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frame / 200) * Math.PI

        material.uniforms.pointSize.value = settings.pointSize
        // material.uniforms.opacity.value = settings.opacity
        material.uniforms.freq.value = settings.freq
        material.uniforms.ampl.value = settings.ampl
        material.uniforms.maxDist.value = settings.maxDist
        // material.uniforms.colorProgress.value = settings.colorProgress

        if (frame <= 200) {
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }
        // console.log(gpuCompute)
        gpuCompute.compute()
        material.uniforms.positionTexture.value =
          gpuCompute.getCurrentRenderTarget(positionVariable).texture
        material.uniforms.time.value = time

        trackRipples()


        renderer.setRenderTarget(bTexture)
        renderer.render(scene, camera);
        bTexture.texture.encoding = THREE.sRGBEncoding;
        mat.uniforms.uDisplacement.value = bTexture.texture
        renderer.setRenderTarget(aTexture)
        renderer.render(scene2, camera)
        aTexture.texture.encoding = THREE.sRGBEncoding;
        mat.uniforms.uTexture.value = aTexture.texture

        renderer.setRenderTarget(null)
        renderer.clear()
        renderer.render(scene1, camera);

        frameRender(time, color)
      }

      // START LOOP
      animate()
      setLoading(false)

      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [mat, meshes, mouse, prevMouse, material, pointColor])

  // START RESIZE EVENTS
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)

    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  // START MOUSE EVENTS
  useEffect(() => {
    refContainer.current.addEventListener('mousemove', mouseEvents, false)
    return () => {
      refContainer.current.removeEventListener('mousemove', mouseEvents, false)
    }
  }, [refContainer, renderer])


  return (
    <Center>
      <Box
        onMouseDown={handleClick}
        onMouseUp={handleClick}
        onTouchStart={handleClick}
        onTouchEnd={handleClick}
        ref={refContainer}
        className="planet"
        // m="0 -100px 50px -100px"
        at={['-20px', '-60px', '-120px']}
        mb={['20px', '20px', '20px']}
        // mt={['20px', '50px', '0']}
        w={[280, 480, 1200]}
        h={[280, 480, 800]}
        position="relative"
      >
        {loading && (
          <Spinner
            size="xl"
            position="absolute"
            left="50%"
            top="50%"
            ml="calc(0px - var(--spinner-size) / 2)"
            mt="calc(0px - var(--spinner-size))"
          />
        )}
      </Box>
    </Center>
  )
}

export default Planet
