export interface Offer {
  _id: string;
  title: string;
  type: string;
  createdAt: string;
  views: number;
  clicks: number;
  orders: number;
  status: 'Active' | 'Inactive';
  canMoveUp?: boolean;
}
