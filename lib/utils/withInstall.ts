import { App, Plugin } from "vue";

export function withInstall(component: any, name = component.name): Plugin {
  component.install = (app: App, options: any) => {
    app.component(name, component);
  }
  return component;
}
