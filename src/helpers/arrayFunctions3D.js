const multiplyArr = (tralationArray, vector) => {
    let resultVector = [];
    for (let i = 0; i < tralationArray.length; i++) {
        let sum = 0;
        for (let j = 0; j < tralationArray[i].length; j++) {
            sum += tralationArray[i][j] * vector[j];
        }
        resultVector.push(sum);
    }
    return resultVector;
};


const traslateFunc = (x, y, z, array) => {
    let result = [];
    const traslation = [
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1],
    ];
    //each array is a vector [x, y, z, 1]
    array.forEach((v) => {
        result.push(multiplyArr(traslation, v));
    });
    return result;
};


const scaleFunc = (x, y, z, array) => {
    let result = [];
    const scale = [
        [x, 0, 0, 0],
        [0, y, 0, 0],
        [0, 0, z, 0],
        [0, 0, 0, 1],
    ];
    array.forEach((v) => {
        result.push(multiplyArr(scale, v));
    });
    return result;
};

const z_rotationFunc = (angle, array) => {
    let result = [];
    const rotate = [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
    array.forEach((v) => {
        result.push(multiplyArr(rotate, v));
    });
    return result;
};
const y_rotationFunc = (angle, array) => {
    let result = [];
    const rotate = [
        [Math.cos(angle), 0, Math.sin(angle), 0],
        [0, 1, 0, 0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1],
    ];
    array.forEach((v) => {
        result.push(multiplyArr(rotate, v));
    });
    return result;
};
const x_rotationFunc = (angle, array) => {
    let result = [];
    const rotate = [
        [1, 0, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle), 0],
        [0, Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 0, 1],
    ];
    array.forEach((v) => {
        result.push(multiplyArr(rotate, v));
    });
    return result;
};

export {
    traslateFunc,
    scaleFunc,
    z_rotationFunc,
    y_rotationFunc,
    x_rotationFunc,
};