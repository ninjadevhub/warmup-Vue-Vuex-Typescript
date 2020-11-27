import Client from '@/data/Client'
import BackendClientInterface from '@/types/BackendClientInterface'
import { FailureResponse } from '@/types/Response'
import UserForm from '@/types/UserForm'

export default class UserRepository {
  private readonly client: BackendClientInterface

  constructor () {
    this.client = new Client()
  }

  async register (form: UserForm): Promise<{ status: string; key: string } | FailureResponse> {
    return this.client.post('users/create', form)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }
}
