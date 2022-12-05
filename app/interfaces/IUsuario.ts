export default interface IUsuario {
  id: number;
  email: string;
  password?: string;
  last_login: Date | null;
  is_suspended: boolean;
  token_valid_after: string | null;
  verified: boolean;
}