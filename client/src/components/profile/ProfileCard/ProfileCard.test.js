import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../store/';
import { authStoreActions } from '../../../store/authStore';

import ProfileCard from './ProfileCard';

describe('ProfileCard', () => {
    beforeEach(() => {
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
                <ProfileCard />
            </Provider>
        );
    });

    test('Should show delete button', () => {
        const deleteBtn = screen.getByRole('button', { name: /delete/i });

        expect(deleteBtn).toBeInTheDocument();
    });

    test('Should show current data', () => {
        const firstName = screen.getByTestId('firstName');
        const lastName = screen.getByTestId('lastName');
        const email = screen.getByTestId('email');
        const phone = screen.getByTestId('phone');

        expect(firstName.textContent).toEqual('John');
        expect(lastName.textContent).toEqual('Smit');
        expect(email.textContent).toEqual('john@gmail.com');
        expect(phone.textContent).toEqual('+49155123123');
    });

    test('Should show edit button', () => {
        const userPenBtn = screen.getByTitle('faUserPen');
        userEvent.click(userPenBtn);

        const editBtn = screen.getByRole('button', { name: /edit/i });

        expect(editBtn).toBeInTheDocument();
    });

    test('Should show error message', () => {
        const userPenBtn = screen.getByTitle('faUserPen');
        userEvent.click(userPenBtn);

        const firstNameInput = screen.getByLabelText('First name:');
        const lastNameInput = screen.getByLabelText('Last name:');
        const emailInput = screen.getByLabelText('Email:');
        const phoneInput = screen.getByLabelText('Phone:');

        userEvent.type(firstNameInput, 'a');
        userEvent.type(lastNameInput, 'a');
        userEvent.type(emailInput, 'john.com');
        userEvent.type(phoneInput, '1231');
        userEvent.click(firstNameInput);

        waitFor(() => {
            const firstNameError = screen.getByText('First name should be at least 2 characters long!');
            const lastNameError = screen.getByText('Last name should be at least 2 characters long!');
            const emailError = screen.getByText('Email address is invalid!');
            const phoneError = screen.getByText('Phone number is invalid!');


            expect(firstNameError).toBeInTheDocument();
            expect(lastNameError).toBeInTheDocument();
            expect(emailError).toBeInTheDocument();
            expect(phoneError).toBeInTheDocument();
        });

    });
    test('Should send request', () => {
        window.fetch = jest.fn();

        const userPenBtn = screen.getByTitle('faUserPen');
        userEvent.click(userPenBtn);

        const editBtn = screen.getByRole('button', { name: /edit/i });


        const firstNameInput = screen.getByLabelText('First name:');
        const lastNameInput = screen.getByLabelText('Last name:');
        const emailInput = screen.getByLabelText('Email:');
        const phoneInput = screen.getByLabelText('Phone:');

        userEvent.type(firstNameInput, 'John123');
        userEvent.type(lastNameInput, 'Sam');
        userEvent.type(emailInput, 'john@gmail.com');
        userEvent.type(phoneInput, '+4917562012273');

        userEvent.click(editBtn);

        waitFor(() => expect(window.fetch).toBeCalled(1));
    });

});