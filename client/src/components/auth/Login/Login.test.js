import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../../store/';

import Login from './Login';

describe('Login', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
    });

    test('Should show email error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(emailInput, 'joe');
        userEvent.click(passwordInput);

        const error = screen.getByText('Please entry a valid email address');
        expect(error).toBeInTheDocument();
    });

    test('Should not show email error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.click(passwordInput);

        const error = screen.queryByText('Please entry a valid email address');
        expect(error).not.toBeInTheDocument();
    });

    test('Should show password error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(passwordInput, '123');
        userEvent.click(emailInput);

        const error = screen.getByText('Password should be at last 5 character');
        expect(error).toBeInTheDocument();
    });

    test('Should not show password error', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(passwordInput, '12345');
        userEvent.click(emailInput);

        const error = screen.queryByText('Password should be at last 5 character');
        expect(error).not.toBeInTheDocument();
    });

    test('Button should be disabled', () => {
        const loginBtn = screen.getByTestId('singInBtn');
        expect(loginBtn).toBeDisabled();
    });

    test('Button should be enabled', () => {
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');
        const loginBtn = screen.getByTestId('singInBtn');

        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.type(passwordInput, '12345');

        expect(loginBtn).toBeEnabled();
    });

    test('Should send request', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => {
                return { _id: '123', email: 'joe@gmail.com' }
            },
        })
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');
        const loginBtn = screen.getByTestId('singInBtn');

        userEvent.type(emailInput, 'joe@gmail.com');
        userEvent.type(passwordInput, '12345');
        userEvent.click(loginBtn);

        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    });

    test('Should switch to register', () => {
        const linkLogin = screen.getByRole('link', { name: /sign up/i });
        userEvent.click(linkLogin);
        expect(global.window.location.pathname).toEqual('/auth/register');
    });
});