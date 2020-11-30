import InboxCapabilites from './InboxCapabilities'

export default interface User {
  data: {
    _id: string;
    api_key: string;
    team_key: string;
    first_name: string;
    last_name: string;
    intials: string;
    email: string;
    account_level: string;
    plan: string;
    plan_credits: number;
    avail_credits: number;
    inbox_capabilities: InboxCapabilites;
    billing: {
      card_icon: string;
      card_brand: string;
      card_last4: string;
    };
    affilate: {
      shareable_code: string;
    };
    created: number;
    trial_ends: number;
    trial_ends_pretty: string;
    verified_account: boolean;
  };
}