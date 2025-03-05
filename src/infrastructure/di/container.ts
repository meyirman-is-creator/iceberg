type Constructor<T> = new (...args: any[]) => T;

class Container {
  private services = new Map<string, any>();

  public register<T>(name: string, impl: T) {
    this.services.set(name, impl);
  }

  public resolve<T>(name: string): T {
    const found = this.services.get(name);
    if (!found) {
      throw new Error(`Service ${name} not found in container`);
    }
    return found as T;
  }
}

export const container = new Container();
