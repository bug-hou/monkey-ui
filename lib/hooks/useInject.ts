import { inject } from "vue";

export function useInject(name: any, key: string, value?: any) {
  return name ?? inject(key, value) ?? value;
}
