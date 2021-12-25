export interface Room {
  id: number;
  name: string;
  visited: boolean;
  exits: number[]; // roomId
}
