const arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = arr.length;
const len = 6;
export function encodeID(num) {
    if (num == 0) return arr[0];
    let encoded = "";
    while (num) {
        const rem = num % base;
        encoded = arr[rem] + encoded;
        num = Math.floor(num / base);
    }
    return encoded;
}
export function decodeID(str) {
    let num = 0;
    for (const char of str) {
        num = num * base + arr.indexOf(char);
    }
    return num;
}
export function generateRandomCode(len = 6) {
    let code = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * base);
        code += arr[randomIndex];
    }
    return code;
}

export async function generateUniqueCode(existsFn, maxTries = 5) {
    for (let i = 0; i < maxTries; i++) {
        const code = generateRandomCode();
        const isTaken = await existsFn(code);
        if (!isTaken) return code;
    }
    throw new Error("Could not generate a unique code.");
}