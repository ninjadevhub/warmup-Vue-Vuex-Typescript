import Client from '@/data/Client'
import AuthModule from '@/store/modules/AuthModule'
import BackendClientInterface from '@/types/BackendClientInterface'
import { FailureResponse } from '@/types/Response'
import User from '@/types/User'
import UserLoginForm from '@/types/UserLoginForm'
import UserRegistrationForm from '@/types/UserRegistrationForm'
import { AxiosResponse } from 'axios'

export default class UserRepository {
  private readonly client: BackendClientInterface
  private readonly apiKey: string = AuthModule.key

  constructor () {
    this.client = new Client()
  }

  async fetch (): Promise<AxiosResponse<User> | FailureResponse> {
    return this.client.get(`users/data/${this.apiKey}`)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }

  async login (form: UserLoginForm): Promise<AxiosResponse<{ status: string; key: string }> | FailureResponse> {
    return this.client.post('users/login', form)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }

  async register (form: UserRegistrationForm): Promise<AxiosResponse<{ status: string; key: string }> | FailureResponse> {
    return this.client.post('users/create', form)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }
}
