export interface StorageProvider {
  upload: (key: string, data: Buffer | Uint8Array) => Promise<string>;
  read: (key: string) => Promise<Buffer>;
  delete: (key: string) => Promise<void>;
  getSignedUrl: (key: string, expiresIn: number) => Promise<string>;
}
