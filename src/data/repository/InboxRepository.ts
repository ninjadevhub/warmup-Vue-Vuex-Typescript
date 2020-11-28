import Client from '@/data/Client'
import AuthModule from '@/store/modules/AuthModule'
import BackendClientInterface from '@/types/BackendClientInterface'
import Inboxes from '@/types/Inboxes'
import { InboxForm } from '@/types/InboxForm'
import { FailureResponse } from '@/types/Response'

export default class InboxRepository {
  private readonly client: BackendClientInterface
  private readonly apiKey: string = AuthModule.key

  constructor () {
    this.client = new Client()
  }

  async fetchAll (page: number): Promise<Inboxes | FailureResponse> {
    return this.client.get(`inboxes/list/${this.apiKey}/${page}`)
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }

  async add (form: InboxForm): Promise<{ status: string; inbox_id: string } | FailureResponse> {
    return this.client.post('inboxes/add', { ...form, ...{ api_key: this.apiKey } })
      .then(response => this.client.toDataResponse(response))
      .catch(error => this.client.toErrorResponse(error))
  }
}
