import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../home';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

global.fetch = jest.fn();

//Mock all fetch calls so they don't affect the test:
global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([{id: 1, name: 'Product Name Test', price: 20.99}])
});

/*ADD TO CART COMPONENT TEST*/
describe('add to cart button', () => { 
    /*Reset the fetch mock before each test*/
    beforeEach(() => {
        fetch.mockReset();
    });

    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups
    });

    test('add the product to cart', async () => {
        //Define the mock product data
        const mockProduct = {
            product_id: 1,
            name: 'Product Name Test',
            description: 'Test product',
            price: 20.99
        };
        
        const mockCart = [{
            ...mockProduct, quantity: 1
        }];

        const mockUser = {
            user: {
                customers_id: '12345',
            }
        };

    /*Mock the GET request for the product details*/
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockProduct]), //return array as cart expects one
    });

    /*Mock the POST request for adding to the cart*/
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart),
    });

    window.alert = jest.fn(); //Mock the alert function

    /*2. Render the Component and ensure it behaves as expected. 
    Here Memory Router provide context for useLocation and other 
    route-related hooks*/
    render(
    <MemoryRouter>
        <AuthContext.Provider value={mockUser}>
            <Home/>
        </AuthContext.Provider>
    </MemoryRouter>
    );

    /*3. Wait for the product to load and be rendered*/
    await waitFor(() => screen.getByText(mockProduct.name));

    //Verify that the product is displayed
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    //Simulate clicking on the "Add to Cart" button
    const addToCartButton = screen.getByText(/add to cart/i);
    expect(addToCartButton).toBeInTheDocument(); //verify that the button is in the doc
    fireEvent.click(addToCartButton);

    /*Wait for the alert to be called*/
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Product successfully added to cart');
    });
   
    //Verify that the fetch calls were made in the correct order
    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:4000/product`,
            expect.objectContaining({
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json'
               }
            })
        );

    //Verify the POST request to add product to the cart
    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:4000/cart/${mockUser.user.customers_id}`,
        expect.objectContaining({
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: mockUser.user.id,
                customers_id: mockUser.user.customers_id,
                quantity: 1,
            }),
        })
    );
    });
});

});