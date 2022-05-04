import { inject } from "vue";

export function useInject(name: any, key: string | symbol, value?: any) {
  return name ?? inject(key, value) ?? value;
}
