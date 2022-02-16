export interface IBus {
  listen: (name: string, listener: (...args: any) => any) => {};
  emit: (name: string, ...data: any) => {};
  forget: (name: string) => {};
}
