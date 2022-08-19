import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import store from '../../../store';

import BoatForm from './BoatForm';
import { boatStoreActions } from '../../../store/boatStore';

describe('Boat form', () => {
    test('Should show error message', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <BoatForm />
                </BrowserRouter>
            </Provider>
        );

        const makeInput = screen.getByTestId('make');
        const modelInput = screen.getByTestId('model');
        const typeInput = screen.getByTestId('type');
        const conditionInput = screen.getByTestId('condition');
        const boatLengthInput = screen.getByTestId('boatLength');
        const yearInput = screen.getByTestId('year');
        const fuelInput = screen.getByTestId('fuel');
        const engineMakeInput = screen.getByTestId('engineMake');
        const hullMaterialInput = screen.getByTestId('hullMaterial');
        const locationInput = screen.getByTestId('location');
        const priceInput = screen.getByTestId('price');
        const descriptionInput = screen.getByTestId('description');

        userEvent.click(makeInput);
        userEvent.click(modelInput);
        userEvent.click(typeInput);
        userEvent.click(conditionInput);
        userEvent.click(boatLengthInput);
        userEvent.click(yearInput);
        userEvent.click(fuelInput);
        userEvent.click(engineMakeInput);
        userEvent.click(hullMaterialInput);
        userEvent.click(locationInput);
        userEvent.click(priceInput);
        userEvent.click(descriptionInput);
        userEvent.click(makeInput);

        const makeError = screen.getByText(/Make should be at least 2 characters long!/i);
        const modelError = screen.getByText(/Model should be at least 2 characters long!/i);
        const typeError = screen.getByText(/Type is required, this field can't be empty!/i);
        const conditionError = screen.getByText(/Condition is required, this field can't be empty!/i);
        const boatLengthError = screen.getByText(/Length is required, this field can't be empty!/i);
        const yearError = screen.getByText(/Year should be between 1960 and 2022!/i);
        const fuelError = screen.getByText(/Fuel is required, this field can't be empty!/i);
        const locationError = screen.getByText(/Location should be at least 2 characters long!/i);
        const engineMakeError = screen.getByText(/Engine Make should be at least 3 characters long!/i);
        const hullMaterialError = screen.getByText(/Hull Material should be at least 2 characters long!/i);
        const priceError = screen.getByText(/Price is required, this field can't be empty!/i);
        const descriptionError = screen.getByText(/Description should be at least 20 characters long!/i);

        expect(makeError).toBeInTheDocument();
        expect(modelError).toBeInTheDocument();
        expect(typeError).toBeInTheDocument();
        expect(conditionError).toBeInTheDocument();
        expect(boatLengthError).toBeInTheDocument();
        expect(yearError).toBeInTheDocument();
        expect(fuelError).toBeInTheDocument();
        expect(locationError).toBeInTheDocument();
        expect(engineMakeError).toBeInTheDocument();
        expect(hullMaterialError).toBeInTheDocument();
        expect(priceError).toBeInTheDocument();
        expect(descriptionError).toBeInTheDocument();
    });

    test('Button should be disabled', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <BoatForm />
                </BrowserRouter>
            </Provider>
        );

        const btn = screen.getByRole('button', { name: /create/i });

        expect(btn).toBeDisabled();
    });

    test('Button should be enabled', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <BoatForm />
                </BrowserRouter>
            </Provider>
        );

        const makeInput = screen.getByTestId('make');
        const modelInput = screen.getByTestId('model');
        const typeInput = screen.getByTestId('type');
        const conditionInput = screen.getByTestId('condition');
        const boatLengthInput = screen.getByTestId('boatLength');
        const yearInput = screen.getByTestId('year');
        const fuelInput = screen.getByTestId('fuel');
        const engineMakeInput = screen.getByTestId('engineMake');
        const hullMaterialInput = screen.getByTestId('hullMaterial');
        const locationInput = screen.getByTestId('location');
        const priceInput = screen.getByTestId('price');
        const descriptionInput = screen.getByTestId('description');

        userEvent.type(makeInput, 'Across');
        userEvent.type(modelInput, 'TR 125');
        userEvent.selectOptions(typeInput, 'yacht');
        userEvent.selectOptions(conditionInput, 'old');
        userEvent.type(boatLengthInput, '12');
        userEvent.type(yearInput, '2011');
        userEvent.selectOptions(fuelInput, 'petrol');
        userEvent.type(engineMakeInput, 'Volvo');
        userEvent.type(hullMaterialInput, 'Fiberglass');
        userEvent.type(locationInput, 'Italy, Bari');
        userEvent.type(priceInput, '210000');
        userEvent.type(descriptionInput, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, aut.');
        userEvent.click(makeInput);


        const btn = screen.getByRole('button', { name: /create/i });

        expect(btn).toBeEnabled();
    });

    test('Should not send request', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <BoatForm />
                </BrowserRouter>
            </Provider>
        );

        window.fetch = jest.fn();

        const makeInput = screen.getByTestId('make');
        const modelInput = screen.getByTestId('model');
        const typeInput = screen.getByTestId('type');
        const conditionInput = screen.getByTestId('condition');
        const boatLengthInput = screen.getByTestId('boatLength');
        const yearInput = screen.getByTestId('year');
        const fuelInput = screen.getByTestId('fuel');
        const engineMakeInput = screen.getByTestId('engineMake');
        const hullMaterialInput = screen.getByTestId('hullMaterial');
        const locationInput = screen.getByTestId('location');
        const priceInput = screen.getByTestId('price');
        const descriptionInput = screen.getByTestId('description');

        userEvent.type(makeInput, 'Across');
        userEvent.type(modelInput, 'TR 125');
        userEvent.selectOptions(typeInput, 'yacht');
        userEvent.selectOptions(conditionInput, 'old');
        userEvent.type(boatLengthInput, '12');
        userEvent.type(yearInput, '2011');
        userEvent.selectOptions(fuelInput, 'petrol');
        userEvent.type(engineMakeInput, 'Volvo');
        userEvent.type(hullMaterialInput, 'Fiberglass');
        userEvent.type(locationInput, 'Italy, Bari');
        userEvent.type(priceInput, '210000');
        userEvent.type(descriptionInput, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, aut.');
        userEvent.click(makeInput);


        const btn = screen.getByRole('button', { name: /create/i });
        userEvent.click(btn);
        expect(window.fetch).not.toHaveBeenCalled();
    });

    test('Should send create request', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <BoatForm />
                </BrowserRouter>
            </Provider>
        );

        const file = new File(['boat'], 'boat.png', { type: 'image/png' });
        window.fetch = jest.fn();

        const makeInput = screen.getByTestId('make');
        const modelInput = screen.getByTestId('model');
        const typeInput = screen.getByTestId('type');
        const conditionInput = screen.getByTestId('condition');
        const boatLengthInput = screen.getByTestId('boatLength');
        const yearInput = screen.getByTestId('year');
        const fuelInput = screen.getByTestId('fuel');
        const engineMakeInput = screen.getByTestId('engineMake');
        const hullMaterialInput = screen.getByTestId('hullMaterial');
        const locationInput = screen.getByTestId('location');
        const priceInput = screen.getByTestId('price');
        const descriptionInput = screen.getByTestId('description');
        const imageInput = screen.getByTestId('image');

        userEvent.type(makeInput, 'Across');
        userEvent.type(modelInput, 'TR 125');
        userEvent.selectOptions(typeInput, 'yacht');
        userEvent.selectOptions(conditionInput, 'old');
        userEvent.type(boatLengthInput, '12');
        userEvent.type(yearInput, '2011');
        userEvent.selectOptions(fuelInput, 'petrol');
        userEvent.type(engineMakeInput, 'Volvo');
        userEvent.type(hullMaterialInput, 'Fiberglass');
        userEvent.type(locationInput, 'Italy, Bari');
        userEvent.type(priceInput, '210000');
        userEvent.type(descriptionInput, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, aut.');
        userEvent.click(makeInput);
        userEvent.upload(imageInput, file);


        const btn = screen.getByRole('button', { name: /create/i });
        userEvent.click(btn);
        waitFor(() => expect(window.fetch).toBeCalled(1));
    });

    test('Should send edit request', () => {
        const file = new File(['boat'], 'boat.png', { type: 'image/png' });
        window.fetch = jest.fn();

        const boat = {
            _id: '132312',
            make: 'Across',
            model: 'TR 125',
            type: 'Sailboat',
            condition: 'New',
            boatLength: '12.45',
            year: '2019',
            fuel: 'Diesel',
            engineMake: 'Volvo',
            hullMaterial: 'Fiberglass',
            location: 'America, Miami',
            price: '286000',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, aut.',
            image: { url: '', public_id: '' },
            owner: 'sad12312dsq121',
            createdAt: '2022-08-13T11:40:41.698Z',
            updatedAt: '2022-08-13T11:41:51.233Z'
        };

        store.dispatch(boatStoreActions.addBoat(boat));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/profile/boat/132312/edit']}>
                    <BoatForm />
                </MemoryRouter>
            </Provider>
        );

        const imageInput = screen.getByTestId('image');

        userEvent.upload(imageInput, file);

        const btn = screen.getByRole('button', { name: /edit/i });
        userEvent.click(btn);
        waitFor(() => expect(window.fetch).toBeCalled(1));
    });

});