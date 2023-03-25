import React, { useEffect, useState } from 'react';
import { traslateFunc, scaleFunc, rotateFunc } from '../helpers/arrayFunctions2D';

const Cube2D = () => {
   const [traslate, setTraslate] = useState({ x: 100, y: 100 });
   const [scale, setScale] = useState({ x: 1, y: 1 });
   const [rotate, setRotate] = useState({ x: 0 });
   const [direction, setDirection] = useState({ x: 1, y: 1 });

   const puntosInitial = [
      [0, 0, 1],
      [100, 0, 1],
      [0, 100, 1],
      [100, 100, 1],
   ];

   const [puntos, setPuntos] = useState(
      scaleFunc(
         scale.x,
         scale.y,
         traslateFunc(
            traslate.x,
            traslate.y,
            rotateFunc(rotate.x, scaleFunc(scale.x, scale.y, puntosInitial))
         )
      )
   );

   const handleTraslate = (e) => {
      const { name, value } = e.target;
      setTraslate((prev) => ({ ...prev, [name]: value }));
   };

   const handleScale = (e) => {
      const { name, value } = e.target;
      setScale((prev) => ({ ...prev, [name]: value }));
   };

   const handleRotate = (e) => {
      const { name, value } = e.target;
      setRotate((prev) => ({ ...prev, [name]: value }));
   };

   const handleReset = () => {
      setTraslate({ x: 0, y: 0 });
      setScale({ x: 1, y: 1 });
      setRotate({ x: 0 });
   };

   useEffect(() => {
      const interval = setInterval(() => {
         setTraslate((prev) => {
            const delta = 10;
            let newX = prev.x + delta * direction.x;
            let newY = prev.y + delta * direction.y;

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

            return { x: newX, y: newY };
         });

         setScale((prev) => ({
            ...prev,
            x: Math.floor(Math.random() + 1),
            y: Math.floor(Math.random() + 1),
         }));

         setRotate((prev) => ({
            ...prev,
            x: prev.x + 0.5,
            y: prev.y + 0.5,
         }));
         setPuntos(
            scaleFunc(
               scale.x,
               scale.y,
               traslateFunc(
                  traslate.x,
                  traslate.y,
                  rotateFunc(
                     rotate.x,
                     scaleFunc(scale.x, scale.y, puntosInitial)
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

export default Cube2D;
