import { Engine } from '..';

import { EventEmitter } from 'events';
import { Chunk } from './chunk';
import { GeneratorType } from '../libs';
import { DefaultGenerator, FlatGenerator, Generator, SinCosGenerator } from '../libs/generators';

type WorldOptionsType = {
  chunkSize: number;
  dimension: number;
  generator: GeneratorType;
};

const defaultWorldOptions: WorldOptionsType = {
  chunkSize: 32,
  dimension: 16,
  generator: 'flat',
};

class World extends EventEmitter {
  public generator: Generator;
  public engine: Engine;
  public options: WorldOptionsType;

  constructor(engine: Engine, options: Partial<WorldOptionsType> = {}) {
    super();

    this.options = {
      ...options,
      ...defaultWorldOptions,
    };

    const { generator } = this.options;

    this.engine = engine;

    switch (generator) {
      case 'default':
        this.generator = new DefaultGenerator(this.engine);
      case 'flat':
        this.generator = new FlatGenerator(this.engine);
      case 'sin-cos':
        this.generator = new SinCosGenerator(this.engine);
    }
  }

  tick = () => {};

  chunkDataNeeded = (chunk: Chunk) => {};
}

export { World };
