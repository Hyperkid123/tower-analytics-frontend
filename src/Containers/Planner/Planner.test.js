/* eslint-disable camelcase */
import { act } from 'react-dom/test-utils';
import {
    mountPage
} from '../../Utilities/tests/helpers';
import Planner from './Planner';

describe('Containers/Planner', () => {
    let wrapper;

    it('should render without any errors', async () => {
        await act(async () => {
            wrapper = mountPage(Planner);
        });
        wrapper.update();

        expect(wrapper).toBeTruthy();
    });
});
