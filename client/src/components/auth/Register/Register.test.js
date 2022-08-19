import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../../store/';

import Register from './Register';

describe('Register', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
    });

    test('Should show first name error', () => {
        const firstNameInput = screen.getByTestId('firstName');
        const lastNameInput = screen.getByTestId('lastName');

        userEvent.type(firstNameInput, '');
        userEvent.click(lastNameInput);

        const error = screen.getByText('The first name should be at least 2 characters long!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show first name error', () => {
        const firstNameInput = screen.getByTestId('firstName');
        const lastNameInput = screen.getByTestId('lastName');

        userEvent.type(firstNameInput, 'Joe');
        userEvent.click(lastNameInput);

        const error = screen.queryByText('The first name should be at least 2 characters long!');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show last name error', () => {
        const lastNameInput = screen.getByTestId('lastName');
        const emailInput = screen.getByTestId('email');

        userEvent.type(lastNameInput, '');
        userEvent.click(emailInput);

        const error = screen.getByText('The last name should be at least 2 characters long!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show last name error', () => {
        const lastNameInput = screen.getByTestId('lastName');
        const emailInput = screen.getByTestId('email');

        userEvent.type(lastNameInput, 'Doe');
        userEvent.click(emailInput);

        const error = screen.queryByText('The last name should be at least 2 characters long!');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show email error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(emailInput, 'joe');
        userEvent.click(passwordInput);

        const error = screen.getByText('Please entry a valid email address!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show email error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.click(passwordInput);

        const error = screen.queryByText('Please entry a valid email address!');
        expect(error).not.toBeInTheDocument();
    });
    test('Should show phone error', () => {
        const phoneInput = screen.getByTestId('phone');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(phoneInput, '+1231');
        userEvent.click(passwordInput);

        const error = screen.getByText('Please entry a valid phone number!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show phone number error', () => {
        const phoneInput = screen.getByTestId('phone');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(phoneInput, '+12345678910');
        userEvent.click(passwordInput);

        const error = screen.queryByText('Please entry a valid phone number!');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show password error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(passwordInput, '123');
        userEvent.click(emailInput);

        const error = screen.getByText('Password should be at last 5 character!');
        expect(error).toBeInTheDocument();
    });

    test('Should not show password error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(passwordInput, '12345');
        userEvent.click(emailInput);

        const error = screen.queryByText('Password should be at last 5 character!');
        expect(error).not.toBeInTheDocument();
    });

    test('Button should be disabled', () => {
        const registerBtn = screen.getByRole('button', {name: /sign up/i});
        expect(registerBtn).toBeDisabled();
    });

    test('Button should be enabled', () => {
        const firstNameInput = screen.getByTestId('firstName');
        const lastNameInput = screen.getByTestId('lastName');
        const emailInput = screen.getByTestId('email');
        const phoneInput = screen.getByTestId('phone');
        const passwordInput = screen.getByTestId('password');
        const repeatPasswordInput = screen.getByTestId('repeatPassword');

        const registerBtn = screen.getByRole('button', {name: /sign up/i});

        userEvent.type(firstNameInput, 'Joe');
        userEvent.type(lastNameInput, 'Doe');
        userEvent.type(phoneInput, '+12345678910');
        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.type(passwordInput, '12345');
        userEvent.type(repeatPasswordInput, '12345');

        expect(registerBtn).toBeEnabled();
    });

    test('Should send request', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                return { _id: '123', email: 'joe@gmail.com' }
            },
        })
        const firstNameInput = screen.getByTestId('firstName');
        const lastNameInput = screen.getByTestId('lastName');
        const emailInput = screen.getByTestId('email');
        const phoneInput = screen.getByTestId('phone');
        const passwordInput = screen.getByTestId('password');
        const repeatPasswordInput = screen.getByTestId('repeatPassword');

        const registerBtn = screen.getByRole('button', {name: /sign up/i});

        userEvent.type(firstNameInput, 'Joe');
        userEvent.type(lastNameInput, 'Doe');
        userEvent.type(phoneInput, '+12345678910');
        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.type(passwordInput, '12345');
        userEvent.type(repeatPasswordInput, '12345');

        userEvent.click(registerBtn);

        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    });

    test('Should switch to register', () => {
        const registerBtn = screen.getByRole('link', { name: /sign in/i });
        userEvent.click(registerBtn);
        expect(global.window.location.pathname).toEqual('/auth/login');
    });
});