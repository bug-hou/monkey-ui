import { provide } from "vue"

type ProvideInfo = [string, any]
export function processProvides(infos: ProvideInfo[]) {
  for (const iterator of infos) {
    provide(iterator[0], iterator[1])
  }
}
