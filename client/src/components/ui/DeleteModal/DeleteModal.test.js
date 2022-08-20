import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../../store';

import DeleteModal from './DeleteModal';

describe('Delete modal', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DeleteModal />
                </BrowserRouter>
            </Provider>
        );
    });

    test('Should close modal on cancel click', () => {
        store.dispatch = jest.fn();

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });

        userEvent.click(cancelBtn);
        waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
    });

    test('Should send request click delete', () => {
        window.fetch = jest.fn();

        const deleteBtn = screen.getByRole('button', { name: /delete/i });

        userEvent.click(deleteBtn);
        waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    });

});