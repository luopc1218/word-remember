export type ServiceFunction = (...params: any[]) => Promise<any>;

export type Service = Record<string, ServiceFunction>;
