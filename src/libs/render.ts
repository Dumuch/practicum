import { Block } from './block';

export class Render {
    render(query: string, blocks: Block[]) {
        const root = document.querySelector(query);
        blocks.forEach(block =>root.appendChild(block.getContent()))
        return root;
    }
}







