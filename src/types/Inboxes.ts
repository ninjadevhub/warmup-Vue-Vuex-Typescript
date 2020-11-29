import Inbox from './Inbox';

export default interface Inboxes {
  status: string; // TODO: Sould be ENUM
  account_total: number;
  current_page: number;
  total_pages: number;
  results: Inbox[];
}
