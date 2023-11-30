import { Block } from '../libs/block';
import store, { IStore, StoreEvents } from '../libs/store';
import isEqual from './isEqual';

export default (mapStateToProps: (state: IStore) => any) => {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(...props: any) {
                let state = mapStateToProps(store.getState());
                const [tagName, allProps] = props;
                super(tagName, { ...allProps, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                });
            }
        };
    };
}
