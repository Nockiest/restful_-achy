// function createObservable(obj, onChange) {
//     return new Proxy(obj, {
//       set(target, property, value) {
//         target[property] = value;
//         onChange(property, value);
//         return true;
//       },
//     });
//   }
  
//   // Example usage
//   const observableObject = createObservable(
//     { variableToWatch: 'initialValue' },
//     (property, value) => {
//       console.log(`Property "${property}" changed to:`, value);
//     }
//   );
  
//   // Now, you can use observableObject like a regular object
//   observableObject.variableToWatch = 'newValue';