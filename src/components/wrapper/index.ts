import { Block } from '../../libs/block';

//language=hbs
const template = `{{{child}}}`;

export class Wrapper extends Block {
  render(): Node {
    return this.compile(template);
  }
}
