// import { useEffect, useState } from "react";

// export const useDebounce = (value, delay) => {
//   const [debVal, setDebVal] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebVal(val), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debVal;
// };

// export const useState = (value) => {
//   const setter = (newValue) => {
//     value = newValue;
//   };
//   return [value, setter];
// };

// function foo(a) {
//     a = 0
// }

// let a = [1,2,3]
// foo(a)

const obj = {
  b: {},
};

Object.defineProperty(obj, "a", {
  value: 123,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(obj.b, "a", {
  value: 321,
  writable: true,
  enumerable: true,
  configurable: true,
});

// console.log(Object.getOwnPropertyDescriptors(obj));

// Object.defineProperty(obj, "a", {
//   value: 123,
//   writable: false,
//   enumerable: true,
//   configurable: false,
// });

console.log(typeof foo);

if (true) {
  console.log(typeof foo);
  function foo() {}
}
console.log(typeof foo);
