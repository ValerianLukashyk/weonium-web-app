import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Spinner, Center, useColorMode } from '@chakra-ui/react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../libs/model'
import { fragment } from '../components/Scene/shaders/fragment'
import { vertex } from '../components/Scene/shaders/vertex'
import { fragment as fr, vertex as vx } from './shaders/shaders'
import gsap from 'gsap'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}


const Planet = () => {

  // set STATE
  const refContainer = useRef()

  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState(null)
  const [_camera, setCamera] = useState()

  const [settings] = useState({
    pointSize: 2310,
    freq: 10,
    ampl: 3,
    maxDist: 2,
    opacity: 1,
    colorProgress: 0,
    color: {
      red: 1,
      green: 1,
      blue: 1,
    },
    activeColor: 1,
    colorMode: null,
    clicked: false,
  })

  const [target] = useState(new THREE.Vector3(0, 0, 0))
  const [initialCameraPosition] = useState(
    // new THREE.Vector3(20 * Math.sin(0.5 * Math.PI), 10, 20 * Math.cos(0.2 * Math.PI))

    new THREE.Vector3(0, 300, 1200)
  )
  const [scene] = useState(new THREE.Scene())
  const [dispScene] = useState(new THREE.Scene())
  // dispScene.background = new THREE.Color('black')
  const [meshesScene] = useState(new THREE.Scene())

  const [_controls] = useState()

  const [meshes] = useState([])


  const [mat] = useState(new THREE.ShaderMaterial(
    {
      side: THREE.DoubleSide,
      fragmentShader: fr,
      vertexShader: vx,
      uniforms: {
        uuTime: { value: 0 },
        uDisplacement: { value: null },
        uTexture: { value: null },
        resolution: { value: new THREE.Vector2() },
      },
    }
  ))

  const [material] = useState(new THREE.ShaderMaterial(
    {
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        uTime: { value: 0 },
        pointSize: { value: settings.pointSize },
        opacity: { value: 1 },
        pointText: { value: new THREE.TextureLoader().load('/texture/point.svg') },
        freq: { value: 0 },
        ampl: { value: 0 },
        maxDist: { value: 0 },
        progress: { value: 1 },
        colorProgress: { value: 0 },
        uColor: { value: { x: 1, y: 1, z: 1 } }
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false

    }
  ))

  const [_textureA, setRtTextureA] = useState()
  const [_textureB, setRtTextureB] = useState()

  const [mouse] = useState(new THREE.Vector2(0, 0))
  const [prevMouse] = useState(new THREE.Vector2(0, 0))

  const { colorMode } = useColorMode()

  useEffect(() => {
    settings.colorMode = colorMode
  }, [colorMode, settings])


  // SET RESIZE FUNCTION
  const handleWindowResize = useCallback(() => {

    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      mat.uniforms.resolution.value.x = scW;
      mat.uniforms.resolution.value.y = scH;
      _textureA.setSize(scW, scH)
      _textureB.setSize(scW, scH)
      renderer.setSize(scW, scH)
      renderer.setScissor(0, 0, scW,scH)
      renderer.setViewport(0, 0, scW, scH)
    }
  }, [renderer, mat, _textureA, _textureB])


  // SET MOUSE POSITION TO STATE
  const mouseEvents = (e) => {
    const { current: container } = refContainer
    const scW = container.clientWidth
    const rect = container.getBoundingClientRect();
    const width = window.innerWidth


    mouse.x = -(e.clientX - width / 2)
    mouse.y = -(e.clientY - rect.top - container.clientHeight / 2)

    // if (settings.clicked) meshesScene.children[0].rotateY(Math.PI * 2 * mouse.x)

  }

  // SET ANIMATION ON CLICK
  const handleClick = (e) => {
    if (e.type === 'mousedown' || e.type === 'touchstart') {
      settings.clicked = true
      // gsap.to(meshesScene.children[0].material.uniforms.uColor.value, {
      //   x: 0.8,
      //   y: 1,
      //   z: 0,
      //   duration: 0.5,
      // })
      // gsap.to(meshesScene.children[0].scale, {

      //   x: 0,
      //   y: 0,
      //   z: 0,
      //   duration: 0.5,
      // })
      // gsap.to(meshesScene.children[1].scale, {
      //   x: 1,
      //   y: 1,
      //   z: 1,
      //   duration: 0.5,
      // })
    } else if (e.type === 'mouseup' || e.type === 'touchend') {
      settings.clicked = false
      // gsap.to(meshesScene.children[0].material.uniforms.uColor.value, {
      //   x: 1,
      //   y: 1,
      //   z: 1,
      //   duration: 0.5,
      // })

      // gsap.to(meshesScene.children[0].scale, {
      //   x: 0.7,
      //   y: 0.7,
      //   z: 0.7,
      //   duration: 0.5,
      // })
      // gsap.to(meshesScene.children[1].scale, {
      //   x: 0,
      //   y: 0,
      //   z: 0,
      //   duration: 0.5,
      // })

    }

  }

  // SET ALL TIME ANIMATION
  const frameRender = (time) => {
    meshesScene.children[0].rotation.y = time / 16;
    meshesScene.children[1].rotation.y = -time / 16;
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
      mat.uniformsNeedUpdate = true


      const glRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      glRenderer.setPixelRatio(window.devicePixelRatio)
      glRenderer.setSize(scW, scH)
      glRenderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(glRenderer.domElement)
      setRenderer(glRenderer)


      const scale = scH* 0.5
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0,
        200000
      )
      camera.position.set(0, 300, 1500)
      camera.lookAt(target)
      setCamera(camera)

      // SET RenderTargets
      const textureA = new THREE.WebGLRenderTarget(scW, scH, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })
      textureA.depthBuffer = true;
      textureA.depthTexture = new THREE.DepthTexture();
      setRtTextureA(textureA)
      const textureB = new THREE.WebGLRenderTarget(scW, scH, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      })
      textureB.depthBuffer = true;
      textureB.depthTexture = new THREE.DepthTexture();
      setRtTextureB(textureB)


      // SET Orbit Controls
      const controls = new OrbitControls(camera, glRenderer.domElement)
      controls.enableZoom = false
      controls.enablePan = false
      controls.rotateSpeed = 0
      controls.target = target
      // setControls(controls)


      const geometry = new THREE.PlaneGeometry(64, 64, 1, 1);
      const max = 54
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

      const geometryFullScr = new THREE.PlaneGeometry(scW* 1.4, scH* 1.4, 1, 1);
      const displacementScreen = new THREE.Mesh(geometryFullScr, mat)

      dispScene.add(displacementScreen)

      loadGLTFModel(meshesScene, scW, scH, material).then(() => {

        meshesScene.children[0].scale.x = 0.7
        meshesScene.children[0].scale.y = 0.7
        meshesScene.children[0].scale.z = 0.7

        startAnim()
      })

      const startAnim = () => {
        gsap.from(meshesScene.children[0].scale, {
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

          let m = meshes[currentWave]
          m.visible = true
          m.position.x = mouse.x
          m.position.y = mouse.y
          m.scale.x = m.scale.y = 1.1
          m.material.opacity = 0.6
        }
      }

      const animate = () => {
        requestAnimationFrame(animate)
        time += 0.01
        frame = frame <= 200 ? frame + 1 : frame
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frame / 200) * Math.PI

        material.uniforms.pointSize.value = settings.pointSize * (Math.sin(time) + 2) / 4
        material.uniforms.progress.value = (Math.sin(time) + 1) / 2
        material.uniforms.freq.value = settings.freq
        material.uniforms.ampl.value = settings.ampl
        material.uniforms.maxDist.value = settings.maxDist

        if (frame <= 200) {
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          // controls.update()
        }

        material.uniforms.uTime.value = time

        trackRipples()

        glRenderer.setRenderTarget(textureB)
        glRenderer.render(scene, camera);
        textureB.texture.encoding = THREE.sRGBEncoding;

        mat.uniforms.uDisplacement.value = textureB.texture
        glRenderer.setRenderTarget(textureA)
        glRenderer.render(meshesScene, camera)
        textureA.texture.encoding = THREE.sRGBEncoding;
        mat.uniforms.uTexture.value = textureA.texture

        glRenderer.setRenderTarget(null)
        glRenderer.clear()
        glRenderer.render(dispScene, camera);

        frameRender(time, color)
      }

      // START LOOP
      animate()
      setLoading(false)

      return () => {
        glRenderer.dispose()
      }
    }
  }, [mat, renderer, meshes, mouse, prevMouse, material, settings])

  // START RESIZE EVENTS
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)

    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  // START MOUSE EVENTS
  useEffect(() => {
    refContainer.current.addEventListener('mousemove', mouseEvents, false)
    return () => {
      refContainer.current.removeEventListener('mousemove', mouseEvents, false)
    }
  }, [refContainer])


  return (
    <Center>
      <Box
        onMouseDown={handleClick}
        onMouseUp={handleClick}
        ref={refContainer}
        className="planet"
        cursor={'pointer'}
        // m="0 -100px 50px -100px"
        at={['-20px', '-60px', '-120px']}
        mb={['20px', '20px', '20px']}
        mt={['0', '0', '0']}
        // mt={['20px', '50px', '0']}
        w={[280, 480, 640]}
        h={[280, 480, 640]}
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
