export interface Medicine {
  name: string;
  interval: number;
  unit: 'minutes' | 'hours';
  times: number;
  nextDoseTime: number;
  notified?: boolean;
}
