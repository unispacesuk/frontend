export function sorterHelper<T>(array: T[], key: any) {
  console.log(array[0]);
  const properties = Object.getOwnPropertyDescriptors(array[0]);
  console.log(Object.getOwnPropertyDescriptor(properties, key));
  // return array.sort((a: any, b: any) => b[key] - a[key]);
}
