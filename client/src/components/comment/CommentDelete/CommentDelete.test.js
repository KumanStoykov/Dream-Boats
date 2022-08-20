import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import store from '../../../store';
import { authStoreActions } from '../../../store/authStore';

import CommentDelete from './CommentDelete';

describe('CommentDelete modal', () => {
    beforeEach(() => {
        const comment = {
            _id: '12341231',
            name: 'Joe',
            comment: 'Lorem ipsum',
            rating: '5',
            creator: '123123',
            createdAt: '2022-08-13T14:11:41.891Z',
            updateAt: '2022-08-13T14:11:41.891Z'
        };
        const userData = {
            _id: '123123',
            firstName: 'John',
            lastName: 'Smit',
            email: 'john@gmail.com',
            phone: '+49155123123'
        };

        store.dispatch(authStoreActions.login({ userData }));

        render(
            <Provider store={store}>
                <CommentDelete openDeleteHandler={() => false} comment={comment} />
            </Provider>
        );
    });


    test('Should send request', () => {
        window.fetch = jest.fn();

        const deleteBtn = screen.getByRole('button', { name: /delete/i });

        userEvent.click(deleteBtn);

        waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    });

    test('Should return back', () => {

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });

        userEvent.click(cancelBtn);

        waitFor(() => {
            const name = screen.getByTestId('name');
            expect(name).toBeInTheDocument();
        });

    });

});