import * as mobx from "mobx";

const PORTRAIT_WIDTH_BREAKPOINT = 768;

export class LayoutStore {
  @mobx.observable.ref
  isPortrait: boolean = window.innerWidth < PORTRAIT_WIDTH_BREAKPOINT;

  constructor() {
    mobx.makeObservable(this);
    window.addEventListener("resize", () => {
      const isPortrait = window.innerWidth < PORTRAIT_WIDTH_BREAKPOINT;

      if (isPortrait !== this.isPortrait) {
        mobx.runInAction(() => (this.isPortrait = isPortrait));
      }
    });
  }
}
