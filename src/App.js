import React, { useEffect } from 'react'
import './App.css'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import lifecycle from 'react-pure-lifecycle'

let _isMounted = false

const methods = {
    componentWillUnmount() {
        _isMounted = false
    }
}

function App() {
  useEffect(() => {
    _isMounted = true
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.set(-100, 350, 100)
    camera.lookAt(scene.position)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    document.getElementById('canvas').appendChild(renderer.domElement)
    const spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-10, 100, 50)
    scene.add(spotLight)
    const ambient = new THREE.AmbientLight(0x666666)
    scene.add(ambient)
    const geometry = new THREE.SphereBufferGeometry(80, 80, 80)
    const material = new THREE.MeshPhongMaterial({  map: new THREE.TextureLoader().load('img/Auckland.jpg') })
    const sphere = new THREE.Mesh(geometry, material)
    const mouseControls = new OrbitControls(
      camera,
      renderer.domElement
    )
    sphere.position.set(0, 0, 0)
    scene.add(sphere)
    camera.position.z = 5
    const animate = function() {
      requestAnimationFrame(animate)
      // sphere.rotation.x += 0.01
      // sphere.rotation.y += 0.01
      renderer.render(scene, camera)
      mouseControls.update()
    }
    animate()
  })

  return (
    <div id="canvas" className="App">
    </div>
  )
}

export default lifecycle(methods)(App)
