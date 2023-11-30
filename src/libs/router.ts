import { Block } from './block';

function render(query: string, block: Block): HTMLElement {
    const root = document.querySelector(query);
    root?.append(block.getContent());
    return root as HTMLElement;
}

class Route {
    private _pathname: string;
    private readonly _blockClass: () => Block;
    private _block: Block | null;
    private _props: { rootQuery: string };

    constructor(pathname: string, view: () => Block, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
            const root = document.querySelector(this._props.rootQuery);
            if (root) {
                root.innerHTML = '';
            }
            this._block = null;
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            this._block = this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    private static __instance: Router | null = null;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private readonly _rootQuery: string | undefined;
    private _errorBlock: Block | null | undefined;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._errorBlock = null;

        Router.__instance = this;
    }

    use(pathname: string, block: () => Block): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery! });
        this.routes?.push(route);
        return this;
    }

    error(block: () => Block): Router {
        return this.use('error', block);
    }

    start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const windowState = event.currentTarget as Window
            this._onRoute(windowState.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        let route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        if (!route) {
            route = this.getRoute('error')!;
        }
        this._currentRoute = route;
        try {
            route.render();
        } catch {
            console.log(route);
            this.getRoute('error')?.render();
        }
    }

    go(pathname: string): void {
        this.history?.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history?.back();
    }

    forward(): void {
        this.history?.forward();
    }

    private getRoute(pathname: string): Route | undefined {
        return this.routes?.find(route => route.match(pathname));
    }
}
