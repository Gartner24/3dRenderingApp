import React, { useState } from 'react';
import { traslateFunc, scaleFunc } from '../helpers/arrayFunctions';

const Cube = () => {
   const [traslate, setTraslate] = useState({ x: 200, y: 50 });
   const [scale, setScale] = useState({ x: 1, y: 1 });

   const puntosInitial = [
      [0, 0, 1],
      [100, 0, 1],
      [0, 100, 1],
      [100, 100, 1],
   ];

   const [puntos, setPuntos] = useState(
    //   traslateFunc(traslate.x, traslate.y, puntosInitial)
        scaleFunc(scale.x, scale.y, puntosInitial)
   );

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

export default Cube;
