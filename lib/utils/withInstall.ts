import { App, Plugin } from "vue";

export function withInstall(component: any): Plugin {
  console.log(component);
  component.install = (app: App, options: any) => {
    app.component(component.name, component);
  }
  return component;
}
