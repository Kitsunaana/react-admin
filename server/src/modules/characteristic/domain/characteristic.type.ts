export interface ICharacteristic {
  id: string;
  caption: string;
  hideClient: boolean;
  unit: string | null;
  value: string;
  status: 'update' | 'create' | 'remove' | 'none';
}
