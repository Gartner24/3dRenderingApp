import React, { useEffect, useState } from 'react';
import {
   traslateFunc,
   scaleFunc,
   x_rotationFunc,
   y_rotationFunc,
   z_rotationFunc,
} from '../helpers/arrayFunctions3D';

const Cube3D = () => {
   const [traslate, setTraslate] = useState({ x: 500, y: 500, z: 100 });
   const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
   const [rotate, setRotate] = useState({ x: 5, y: 10, z: 10 });
   const [direction, setDirection] = useState({ x: 1, y: 1, z: 1 });

   //    Vecrtores del cubo 3d = 8 puntos
   const puntosInitial = [
      [0, 0, 0, 1],
      [100, 0, 0, 1],
      [0, 100, 0, 1],
      [100, 100, 0, 1],
      [0, 0, 100, 1],
      [100, 0, 100, 1],
      [0, 100, 100, 1],
      [100, 100, 100, 1],
   ];

   const [puntos, setPuntos] = useState(
      traslateFunc(
         traslate.x,
         traslate.y,
         traslate.z,
         scaleFunc(
            scale.x,
            scale.y,
            scale.z,
            x_rotationFunc(
               rotate.x,
               y_rotationFunc(rotate.y, z_rotationFunc(rotate.z, puntosInitial))
            )
         )
      )
   );

   useEffect(() => {
      traslateFunc(20, 15, 10, puntosInitial);
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         setTraslate((prev) => {
            const delta = 10;
            let newX = prev.x + delta * direction.x;
            let newY = prev.y + delta * direction.y;
            let newZ = prev.z + delta * direction.z;

            if (newX <= 0) {
               newX = 0;
               setDirection((prev) => ({ ...prev, x: 1 }));
            } else if (newX >= window.innerWidth - 150) {
               newX = window.innerWidth - 150;
               setDirection((prev) => ({ ...prev, x: -1 }));
            }

            if (newY <= 0) {
               newY = 0;
               setDirection((prev) => ({ ...prev, y: 1 }));
            } else if (newY >= window.innerHeight - 150) {
               newY = window.innerHeight - 150;
               setDirection((prev) => ({ ...prev, y: -1 }));
            }

            if (newZ <= 0) {
               newZ = 0;
               setDirection((prev) => ({ ...prev, z: 1 }));
            } else if (newZ >= window.innerHeight - 150) {
               newZ = window.innerHeight - 150;
               setDirection((prev) => ({ ...prev, z: -1 }));
            }

            return { x: newX, y: newY, z: newZ };
         });

         setScale((prev) => ({
            ...prev,
            x: Math.floor(Math.random() + 1),
            y: Math.floor(Math.random() + 1),
         }));

         setRotate((prev) => ({
            ...prev,
            x: prev.x + 0.1,
            y: prev.y + 0.1,
            z: prev.z + 0.1,
         }));
         setPuntos(
            scaleFunc(
               scale.x,
               scale.y,
               scale.z,
               traslateFunc(
                  traslate.x,
                  traslate.y,
                  traslate.z,
                  x_rotationFunc(
                     rotate.x,
                     y_rotationFunc(
                        rotate.y,
                        z_rotationFunc(rotate.z, puntosInitial)
                     )
                  )
               )
            )
         );
      }, 100);
      return () => clearInterval(interval);
   }, [puntos]);

   return (
      <>
         {puntos.map((punto, index) => {
            return (
               <div
                  key={index}
                  style={{
                     position: 'absolute',
                     left: punto[0],
                     top: punto[1],
                     width: 10,
                     height: 10,
                     backgroundColor: 'red',
                  }}></div>
            );
         })}
      </>
   );
};

export default Cube3D;
