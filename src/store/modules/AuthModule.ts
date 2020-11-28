import { Module, Action, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import Cookies from 'js-cookie'
import store from '@/store/index'

@Module({
  name: 'auth',
  dynamic: true,
  namespaced: true,
  store
})
export class AuthModule extends VuexModule {
  key: string = Cookies.get('authKey') || ''

  get isAuthenticated (): boolean {
    return !!this.key
  }

  @Action({ rawError: true })
  async login (response: { status: string; key: string }): Promise<void> {
    this.context.commit('authSuccess', response)
  }

  @Action({ rawError: true })
  logout (): void {
    this.context.commit('authLogout')
  }

  @Mutation
  authSuccess (response: { status: string; key: string }) {
    Cookies.set(
      'authKey',
      (response as { status: string; key: string }).key,
      {
        domain: location.hostname,
        sameSite: 'strict'
      }
    )
  }

  @Mutation
  authLogout () {
    Cookies.remove(
      'authKey',
      {
        domain: location.hostname,
        sameSite: 'strict'
      }
    )
  }
}

export default getModule(AuthModule)
