export interface ItemDto {
  id: number;
  time: number;
  by?: string;
  title?: string;
  score?: number;
  url?: string;
  text?: string;
  kids?: number[];
  deleted?: boolean;
}
