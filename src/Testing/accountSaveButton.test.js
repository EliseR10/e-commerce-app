import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from '../account';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

//mock user
const mockUser = {
    user: {
        id: 1,
        customers_username: 'Test User',
        customers_phone_number: '01531 333 555'
    },
};
//mock data
/*const mockUserData = {
    user: {
        id: 1,
        customers_username: 'Test User',
        customers_phone_number: '01531 333 666'
    },
}*/

//global mock
global.fetch = jest.fn();

//describe + beforeEach() + afterEach()
describe('Make sure the save button is updating the data entered in the input', () => {
    beforeEach(() => {
        fetch.mockReset();
    });

    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups
    });
    
    //test
    test('test that the save button is updating data when clicked', async () => {
        //mock fetch
        fetch
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([mockUser.user]), //initial GET for account data
        })
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]), //GET for orders data
        })
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}), //PUT for updating account
        })
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]), //final GET for displaying account
        });

        //Mock the alert function
        window.alert = jest.fn(); 
        
        //render
        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Account/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        //simulating user editing phone number input field
        const phoneInput = await screen.findByRole('textbox', {name: /Please enter a valid phone number in the format 12345 678987/i});
        const changedPhoneInput = fireEvent.change(phoneInput, {target: {value: '01531 666 333'}});

        //find the save button
        const save = await waitFor(() => screen.getByRole('button', {name:/phoneSaveButton/i}));

        //Mock the user pressing the save button
        fireEvent.click(save);

        //expected fetch
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(3);
            expect(fetch).toHaveBeenCalledWith (
                `http://localhost:4000/account/${mockUser.user.id}`,
                expect.objectContaining({
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        customers_phone_number: '01531 666 333'
                    }),
                })
            )
        })

        //expected alert box
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Your account has been updated, thank you!');
        });
    })
})
    
