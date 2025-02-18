export abstract class BaseEntity {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toJSON(): Record<string, any> {
    return Object.getOwnPropertyNames(this).reduce((acc, key) => {
      const value = (this as any)[key];

      if (Array.isArray(value)) {
        acc[key] = value.map(item => this.serializeValue(item));
      } else {
        acc[key] = this.serializeValue(value);
      }

      return acc;
    }, {} as Record<string, any>);
  }

  protected serializeValue(value: any): any {
    if (value && typeof value === 'object') {
      if (value instanceof BaseEntity || typeof value.toJSON === 'function') {
        return value.toJSON();
      }

      return Object.entries(value).reduce((acc, [k, v]) => {
        acc[k] = this.serializeValue(v);
        return acc;
      }, {} as Record<string, any>);
    }

    return value;
  }

  protected static fromJSON<T extends BaseEntity>(
    this: new (...args: any[]) => T,
    json: Record<string, any>,
  ): T {
    // JSON nesnesindeki tüm property'leri al
    const propertyNames = Object.keys(json);

    // Constructor parametrelerini hazırla
    const constructorParams = propertyNames.map(key => json[key]);

    // Yeni nesne oluştur
    return new this(...constructorParams);
  }
}
