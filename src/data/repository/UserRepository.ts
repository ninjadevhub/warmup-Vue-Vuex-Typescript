import Client from '@/data/Client'
import BackendClientInterface from '@/types/BackendClientInterface'
import { FailureResponse } from '@/types/Response'
import UserLoginForm from '@/types/UserLoginForm'
import UserRegistrationForm from '@/types/UserRegistrationForm'

export default class UserRepository {
  private readonly client: BackendClientInterface

  constructor () {
    this.client = new Client()
  }

  async login (form: UserLoginForm): Promise<{ status: string; key: string } | FailureResponse> {
    return this.client.post('users/login', form)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }

  async register (form: UserRegistrationForm): Promise<{ status: string; key: string } | FailureResponse> {
    return this.client.post('users/create', form)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }
}
