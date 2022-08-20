import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import store from '../../../store';
import { commentStoreActions } from '../../../store/commentStore';
import { authStoreActions } from '../../../store/authStore';

import CommentForm from './CommentForm';

describe('CommentForm modal', () => {
    beforeEach(() => {
        const userData = {
            _id: '123123',
            firstName: 'John',
            lastName: 'Smit',
            email: 'john@gmail.com',
            phone: '+49155123123'
        };

        store.dispatch(authStoreActions.login({ userData }))
        render(
            <Provider store={store}>
                <CommentForm />
            </Provider>
        );
    });



    test('Should show name error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');

        userEvent.type(nameInput, 'a');
        userEvent.click(commentInput);

        const error = screen.getByText('The name should be at least 2 characters long!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show name error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');

        userEvent.type(nameInput, 'Joe');
        userEvent.click(commentInput);

        const error = screen.queryByText('The name should be at least 2 characters long!');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show comment error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');

        userEvent.type(commentInput, 'Lorem');
        userEvent.click(nameInput);

        const error = screen.getByText('The comment should be at least 10 characters long!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show comment error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');

        userEvent.type(commentInput, 'Lorem ipsum');
        userEvent.click(nameInput);

        const error = screen.queryByText('The comment should be at least 10 characters long!');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show rating error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');

        userEvent.type(nameInput, 'Joe');
        userEvent.type(commentInput, 'Lorem ipsum');

        const sendBtn = screen.getByRole('button', { name: /send/i });

        userEvent.click(sendBtn);

        const error = screen.getByText('Rating is required!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show rating error', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');
        const ratingInput = screen.getByTestId('rating');

        userEvent.type(nameInput, 'Joe');
        userEvent.type(commentInput, 'Lorem ipsum');

        userEvent.click(ratingInput);

        const sendBtn = screen.getByRole('button', { name: /send/i });

        userEvent.click(sendBtn);

        const error = screen.queryByText('Rating is required!');
        expect(error).not.toBeInTheDocument();
    });

    test('Button should be disabled', () => {
        const sendBtn = screen.getByRole('button', { name: /send/i });
        expect(sendBtn).toBeDisabled();
    });

    test('Button should be enabled', () => {
        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');
        const ratingInput = screen.getByTestId('rating');
        const sendBtn = screen.getByRole('button', { name: /send/i });

        userEvent.type(nameInput, 'Joe');
        userEvent.type(commentInput, 'Lorem ipsum');

        userEvent.click(ratingInput);

        expect(sendBtn).toBeEnabled();
    });

    test('Should send create request', () => {
        window.fetch = jest.fn();

        const nameInput = screen.getByTestId('name');
        const commentInput = screen.getByTestId('comment');
        const ratingInput = screen.getByTestId('rating');

        userEvent.type(nameInput, 'Joe');
        userEvent.type(commentInput, 'Lorem ipsum');

        userEvent.click(ratingInput);

        const sendBtn = screen.getByRole('button', { name: /send/i });

        userEvent.click(sendBtn);

        waitFor(() => expect(window.fetch).toBeCalled(1));
    });

    test('Should send edit request', () => {
        window.fetch = jest.fn();

        const comment = {
            _id: '12341231',
            name: 'Joe',
            comment: 'Lorem ipsum',
            rating: '5',
            creator: '123123123',
            createdAt: '2022-08-13T14:11:41.891Z',
            updateAt: '2022-08-13T14:11:41.891Z'
        };

        store.dispatch(commentStoreActions.addComment(comment));
        store.dispatch(commentStoreActions.setEditForm(true));

        const editBtn = waitFor(() => screen.getByRole('button', { name: /edit/i }));


        waitFor(() => {
            userEvent.click(editBtn);
            expect(window.fetch).toBeCalled(1)

        });
    });


});