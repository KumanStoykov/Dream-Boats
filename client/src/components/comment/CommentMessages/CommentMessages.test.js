import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import store from '../../../store';
import { authStoreActions } from '../../../store/authStore';

import CommentMessages from './CommentMessages';

describe('CommentMessages modal', () => {
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
                <CommentMessages comment={comment} />
            </Provider>
        );
    });



    test('Should show edit button', () => {
        const editBtn = screen.getByTitle('faEdit');

        expect(editBtn).toBeInTheDocument();
    });

    test('Should show trash button', () => {
        const trashBtn = screen.getByTitle('faTrash');

        expect(trashBtn).toBeInTheDocument();
    });

    test('Should show delete button ', () => {
        const trashBtn = screen.getByTitle('faTrash');
        userEvent.click(trashBtn);

        const deleteBtn = screen.getByRole('button', { name: /delete/i });

        expect(deleteBtn).toBeInTheDocument();
    });

    test('Should show cancel button ', () => {
        const trashBtn = screen.getByTitle('faTrash');
        userEvent.click(trashBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });

        expect(cancelBtn).toBeInTheDocument();
    });

});