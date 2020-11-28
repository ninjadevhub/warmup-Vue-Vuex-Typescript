export default interface Inboxes {
  status: string; // TODO: Sould be ENUM
  account_total: number;
  current_page: number;
  total_pages: number;
  results: any[]; // TODO: should define single Inbox type
}
