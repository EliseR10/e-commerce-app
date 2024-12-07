import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from '../account';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

//Mock user
const mockUser = {
    user: {
        id: 1,
        customers_username: 'Test User',
        customers_phone_number: '01531 333 555'
    },
};
//Global mock
global.fetch = jest.fn();

//describe + beforeEach + afterEach
describe('Making sure that the data from account is displayed', () => {
    beforeEach(() => {
        fetch.mockReset();
    });

    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups 
    });

    //test
    test('display data in account page', async() => {
        //mock fetch
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([mockUser.user]), //return array as Account expects one
        });

        //render
        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Account/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //find inputs?
        const username = await waitFor(() => screen.getByDisplayValue(mockUser.user.customers_username));
        const phoneNumber = screen.getByDisplayValue(mockUser.user.customers_phone_number);

        expect(username).toBeInTheDocument();
        expect(phoneNumber).toBeInTheDocument();

        //expected fetch
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:4000/account/${mockUser.user.id}`,
                expect.objectContaining({
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                    }
                }),
            );
        });

        
    });
});

