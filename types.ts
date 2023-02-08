export interface Repository {
  init(): Promise<void>;
  create(name: string, pubkey: string): Promise<void>;
  getByName(name: string): Promise<Nip05Data>;
}

export type Nip05Data = {
  key: string;
  pub: string;
};

export type CreateInput = {
  name: string;
  pubkey: string;
  "h-captcha-response": string;
};

export type HcaptchaResult = {
  success: boolean;
};
