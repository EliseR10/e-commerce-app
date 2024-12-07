import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../cart';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

// 1. User to mock
const mockUser = {
    user: {
        customers_id: '12345',
        name: 'Test User'
    },
};

// 2. Product to mock
const mockProduct = {
    product_id: 1,
    name: 'Product Name Test',
    description: 'Test product',
    price: 20.99,
    quantity: 1
};

// 3. Cart to mock
const mockCart = {
    cartItems: [mockProduct],
    totalCartValue: 20.99,
    quantity: 1
};

const customerId = mockUser.user.customers_id;
const productId = mockProduct.product_id;

// 4. Describe
describe('check that OrderNow is putting the order through', () => {
    // 5. Before each
    beforeEach(() => {
        // 1. Global.fetch = jest.fn()
        global.fetch = jest.fn();

        //2. Fetch get to mock
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCart),
        });
    });
          
    // 6. After each
    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups
    });

    // 7. Test
    test('that the cart is put through my order table', async () => {
        
        // 3. Fetch post to mock
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'Order placed successfully'}),
        });

        // 1. Render Cart
        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Cart/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
    
        
        // 2. Check if the order button is here
        const orderNow = await waitFor(() => screen.getByRole('button', {name: /Order Now!/i}));

        // 3. Mock the user pressing the order now button
        fireEvent.click(orderNow);

        // 4. Expected fetch POST request
        await waitFor(() => {
            //validate the get request for the cart made 
            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:4000/cart/${customerId}`,
                expect.objectContaining({
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                }
                }),
            );

            //validate the post request to place the order
            expect(fetch).toHaveBeenCalledWith (
                `http://localhost:4000/orders/${customerId}`,
                    expect.objectContaining({
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type':'application/json',
                        },
                    }),
            );

        });
    });
});