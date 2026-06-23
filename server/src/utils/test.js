import { encodeID, decodeID, generateRandomCode } from "./base62.js";
console.log("ENCODE / DECODE");
const nums = [0, 1, 10, 61, 62, 63, 1000, 123456789];
for (const n of nums) {
    const encoded = encodeID(n);
    const decoded = decodeID(encoded);
    const ok = decoded == n;
    console.log(
        `${String(n).padStart(10)}  ->  ${encoded.padEnd(8)}  ->  ${decoded}` +
        (ok ? "  ✅" : "  ❌ FAIL")
    );
}
console.log("Random Code Generation");
for (let i = 0; i < 5; i++) {
    console.log(`Code ${i + 1}:  ${generateRandomCode()}`);
}