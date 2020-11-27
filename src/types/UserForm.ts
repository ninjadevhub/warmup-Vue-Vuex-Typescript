export default interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  referred_by?: string | null;
}
