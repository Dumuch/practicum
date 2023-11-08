import { Block } from './block';

export class Render {
    render(query: string, block: Block) {
        const root = document.querySelector(query);
        root.appendChild(block.getContent());
        return root;
    }
}







