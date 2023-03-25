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


const traslateFunc = (x, y, array) => {
    let result = [];
    const traslation = [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1],
    ];
    //each array is a vector [x, y, 1]
    array.forEach((v) => {
        result.push(multiplyArr(traslation, v));
    });
    return result;
};


const scaleFunc = (x, y, array) => {
    let result = [];
    const scale = [
        [x, 0, 0],
        [0, y, 0],
        [0, 0, 1],
    ];
    array.forEach((v) => {
        result.push(multiplyArr(scale, v));
    });
    return result;
};

const rotateFunc = (angle, v) => {
    const scale = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1],
    ];
    return multiplyArr(scale, v);
};

export { traslateFunc, scaleFunc, rotateFunc };