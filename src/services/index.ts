export type ServiceFunction = (...params: any[]) => Promise<void>;

export type Service = Record<string, ServiceFunction>;
