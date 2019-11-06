/* eslint react/jsx-no-undef:0 */
import React, { useState, useEffect } from "react";

const width = 300;
const height = 300;

function App() {
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    let id = -1;
    function animate() {
      id = requestAnimationFrame(animate);
      setRotation(prev => ({
        x: prev.x + 0.01,
        y: prev.y + 0.01
      }));
    }
    animate();
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <threeWebGLRenderer width={width} height={height} antialias>
      <threeScene>
        <threeMesh rotation={rotation}>
          <threeBoxGeometry width={1} height={1} depth={1} />
          <threeMeshBasicMaterial
            parameters={{
              color: 0x00ff00
            }}
          />
        </threeMesh>
      </threeScene>
      <threePerspectiveCamera
        fov={75}
        aspect={width / height}
        near={0.1}
        far={1000}
        position={{
          z: 5
        }}
      />
    </threeWebGLRenderer>
  );
}

export default App;
