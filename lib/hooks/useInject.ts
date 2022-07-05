import { inject } from "vue";

export function useInject<T>(name: any, key: string | symbol, value?: T): T {
  return name ?? inject<T>(key) ?? value;
}
