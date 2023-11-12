import { Block } from '../libs/block';

export default (query: string, block: Block): void => {
    const root = document.querySelector(query);
    root && root.appendChild(block.getContent());
};
