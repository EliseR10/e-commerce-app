import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../cart';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

/*Mock user data*/
const mockUser = {
    user: {
        customers_id: '12345',
        name: 'Test User'
    },
};

const mockProduct = {
    product_id: 1,
    name: 'Product Name Test',
    description: 'Test product',
    price: 20.99,
    quantity: 1
};

const mockCart = {
    cartItems: [mockProduct],
    totalCartValue: 20.99,
};

const customerId = mockUser.user.customers_id;
const productId = mockProduct.product_id;

describe('check that the quantity button change the quantity', () => {
    beforeEach(() => {
        /*Mock the API fetch function using Jest's mocking functionality*/
        global.fetch = jest.fn();

        //fetch.mockReset();
        /*Mock the GET request to display the cart*/
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCart),
        });

        /*Mock the PUT request for updating quantity of the product*/
        fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
            ...mockProduct,
            quantity: 2,
        })
        });

        /*Mock the GET request for updating quantity of the product*/
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCart),
        })
    });


    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups
    });

    test('change quantity', async () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Cart/>
                </AuthContext.Provider>
            </MemoryRouter>
        ); 
        
        /*Wait for the quantity to load and be rendered*/
        await waitFor(() => screen.getByText('Product Name Test'));

        //Verify that the product is displayed
        expect(screen.getByText('Product Name Test')).toBeInTheDocument();
        

        //Find the initial Quantity button in the doc
        const productQuantity = screen.getByText(/Qty: 1/i);
        expect(productQuantity).toBeInTheDocument();
        
        //Simulate clicking on the dropdown button
        fireEvent.click(productQuantity);

        //Wait for the dropdown to appear
        const dropdownOptions = await screen.findAllByRole('button');
        const newQuantityOptions = dropdownOptions.find(button => button.textContent === '2');
        
        //Ensure the new quantity option is found
        expect(newQuantityOptions).toBeInTheDocument();

        //Simulate clicking on the new options
        fireEvent.click(newQuantityOptions); //specify which button you want to click from the getAllByRole (because it gets them all)

        //Wait for the quantity to be updated
        await screen.findByText('2');
        expect(screen.getByText('2')).toBeInTheDocument();

        /*Verify that the fetch calls were made in the correct order*/
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:4000/cart/${mockUser.user.customers_id}`,
                expect.objectContaining({
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                }
                }),
            );

            //Verify the POST request to add product to the cart
            expect(fetch).toHaveBeenCalledWith (
                `http://localhost:4000/cart/${customerId}/${productId}`,
                    expect.objectContaining({
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            id: mockUser.user.id,
                            quantity: 2,
                        }),
                    })
            );

            expect(fetch).toHaveBeenCalledWith(
                `http://localhost:4000/cart/${mockUser.user.customers_id}`,
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
