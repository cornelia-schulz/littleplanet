import React, { useEffect } from 'react'
import './App.css'
import * as THREE from 'three'
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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('canvas').appendChild(renderer.domElement)
    const geometry = new THREE.SphereBufferGeometry(1, 5, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)
    camera.position.z = 5
    const animate = function() {
      requestAnimationFrame(animate)
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
  })

  return (
    <div id="canvas" className="App">
    </div>
  )
}

export default lifecycle(methods)(App)
