import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../store';
import { commentStoreActions } from '../../../store/commentStore';
import { authStoreActions } from '../../../store/authStore';

import CommentModal from './CommentModal';

describe('Comment modal', () => {
    beforeEach(() => {
        store.dispatch(commentStoreActions.addComments({
            comments: [
                { _id: '12311', name: 'John Phillips', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '5', creator: '12312', createdAt: '2022-08-13T14:11:41.891Z', updateAt: '2022-08-13T14:11:41.891Z' },
                { _id: '12312', name: 'John Phillips', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '5', creator: '12312', createdAt: '2022-08-13T14:11:41.891Z', updateAt: '2022-08-13T14:11:41.891Z' },
                { _id: '12313', name: 'John Phillips', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '5', creator: '12312', createdAt: '2022-08-13T14:11:41.891Z', updateAt: '2022-08-13T14:11:41.891Z' },
                { _id: '12314', name: 'John Phillips', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '5', creator: '12312', createdAt: '2022-08-13T14:11:41.891Z', updateAt: '2022-08-13T14:11:41.891Z' },
                { _id: '12315', name: 'John Phillips', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '5', creator: '12312', createdAt: '2022-08-13T14:11:41.891Z', updateAt: '2022-08-13T14:11:41.891Z' },
            ]
        }));
        render(
            <Provider store={store}>
                <CommentModal />
            </Provider>
        );
    });

    test('Should show comments', () => {
        const commentList = screen.queryAllByRole('listitem');
        waitFor(() => expect(commentList.length).toEqual(5));
    });


    test('Should show add comment button', () => {
        store.dispatch(authStoreActions.login({ userData: { _id: '123123', firstName: 'John', lastName: 'Smit', email: 'john@gmail.com', phone: '+49155123123' } }))

        const addBtn = waitFor(() => screen.getByTitle('faComment'));
        waitFor(() => expect(addBtn).toBeInTheDocument());
    });

    test('Should not show add comment button', () => {

        const addBtn = waitFor(() => screen.getByTitle('faComment'));
        waitFor(() => expect(addBtn).not.toBeInTheDocument());
    });

});