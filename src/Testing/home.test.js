import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../home';
import { MemoryRouter } from 'react-router-dom';
/*import my authContext from my real file to use*/
import { AuthContext } from '../AuthContext';

/*Testing the display product fetch api endpoint:
Simulate the API request and ensure that the data is correctly 
fetched and rendered in your component. Use Jest along with React 
Testing Library to mock the fetch API and test the rendered output based 
on the fetched data.*/

/*Mock user data*/
const mockUser = {
    user: {
        customers_id: '12345',
        name: 'Test User'
    },
};

/*1.Mock the API fetch function using Jest's mocking functionality*/
global.fetch = jest.fn();

describe('Home Component', () => {
    /*Reset the fetch mock before each test*/
    beforeEach(() => {
        fetch.mockReset();
    });

    afterEach(() => {
        fetch.mockReset();
        jest.clearAllTimers(); // Clear timers
        jest.clearAllMocks(); //clear all mock setups
    });

    test('displays product data after fetch', async () => {
        //Define the mock product data
        const mockProduct = {
            name: 'Product Name Test',
            description: 'Test product',
            price: 20.99
        }; 

        /*Set the mock fetch implementation to return the mock data*/
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([mockProduct]), //return array as Home expects one
        });
    

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
    
/*3. Wait for Data to Load, by using waitFor until product data is loaded 
and rendered.*/
    await waitFor(() => screen.getByText(mockProduct.name));

/*4. Verify the rendered output once the data has been fetched*/
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`£${mockProduct.price}`)).toBeInTheDocument();

    });

    test('shows loading text while fetching', () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Home/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        /*Check if the loading text is shown initially*/
        expect(screen.getByText('Products loading...')).toBeInTheDocument();
    });

    test('handles no product found', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(null), //no product data returned
        });

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockUser}>
                    <Home/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        /*Wait for the result to be rendered*/
        await waitFor(() => screen.getByText('No product available for sales.'));

        /*Check if no product found, message is displayed*/
        expect(screen.getByText('No product available for sales.')).toBeInTheDocument();
    });   
});

/*ADD TO CART COMPONENT TEST
describe('add to cart button', () => { 
    /*Reset the fetch mock before each test
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
            id: 1,
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
                name: 'Test User'
            },
        };

    /*Set the mock fetch implementation to return the mock data
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCart), //return array as cart expects one
    });

    window.alert = jest.fn(); //Mock the alert function

    /*2. Render the Component and ensure it behaves as expected. 
    Here Memory Router provide context for useLocation and other 
    route-related hooks
    render(
    <MemoryRouter>
        <AuthContext.Provider value={mockUser}>
            <Home/>
        </AuthContext.Provider>
    </MemoryRouter>
    );

    /*3. Wait for the product to load and be rendered
    await waitFor(() => screen.getByText(mockProduct.name));

    //Verify that the product is displayed
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    //Simulate clicking on the "Add to Cart" button
    const addToCartButton = screen.getByText(/add to cart/i);
    expect(addToCartButton).toBeInTheDocument(); //verify that the button is in the doc
    fireEvent.click(addToCartButton);
    screen.debug();

    //Wait for the alert to be called
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Product successfully added to cart');
    });
    screen.debug();

    //Verify fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:4000/cart/${mockUser.customers_id}`,
        expect.objectContaining({
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                customers_id: mockUser.customers_id,
                product_id: mockProduct.product_id,
                quantity: 1,
            }),
        })
    );
});

});*/

