/**
 * plot: Du erwachst aus einem Traum. [...] Du ziehst dich an und gehst der Sache nach.
 * question: Was willst du tun?
 * options: [{id: 1, a: nach links}, {id: 2, nach rechts}]
 * chosenOption: 1
 * loadPlot(1);
 * plot: du gehst nach links
 * ...
 *
 *
 */

import { Room } from './room';

export interface Story {
  [id: string]: StoryPart;
}

export interface StoryPart {
  id: number;
  plot: string;
  question: string;
  options: Decision[];
  room?: Room;
}

export interface Decision {
  id: number;
  answer: string;
  nextStoryPartId: number;
}
