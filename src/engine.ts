const readline = require('readline');

import { Story, StoryPart } from './interfaces/story';
import * as story from './data/story.json';

export class Engine {
  reader!: any;
  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    this.reader.on('line', (key: string) => {
      console.info('---------------');
      const found = this.currentStoryPart?.options.find((option) => option.id.toString().trim() === key.toString().trim());
      // console.log('found', found);
      if (found) {
        this.getNextStoryPart(found.nextStoryPartId);
      } else {
        console.log('Fehlerhafte Eingabe. Bitte wähle aus den möglichen Antworten:');
        console.info('---------------');
        this.output();
      }
    });
  }

  story: Story | null = null;
  currentStoryPart: StoryPart | null = null;

  start() {
    this.story = story;
    this.getNextStoryPart(1);
  }

  quit() {
    console.log('Ende');
    process.exit();
  }

  getNextStoryPart(id: number) {
    if (id === -1) {
      this.quit();
    }
    this.currentStoryPart = this.getStoryPartById(id);
    this.output();
  }

  getStoryPartById(id: number): StoryPart | null {
    if (this.story) {
      return this.story[id.toString()];
    } else {
      console.error('Es wurde keine Story geladen');
      return null;
    }
  }

  output() {
    //console.clear();
    if (this.currentStoryPart) {
      console.info(this.currentStoryPart.plot);
      console.info('---------------');
      console.info(this.currentStoryPart.question);
      console.info('---------------');
      if (this.currentStoryPart.options) {
        for (const option of this.currentStoryPart.options) {
          console.info(option.id.toString() + ': ' + option.answer);
        }
        console.info('---------------');
        console.log('Was möchtest du tun?');
        console.info('---------------');
      }
    }
  }
}
