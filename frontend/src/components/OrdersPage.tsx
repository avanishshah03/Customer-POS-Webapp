import React from 'react';
import OrderTable from './OrderTable';

export const OrdersPage: React.FC = () => {
    return (
        <div>
            <h1>Orders Page</h1>
            <ul>
                <li>Create: make a new order</li>
                <li>Read: view all orders; view a single order (including status: pending, fulfilled, cancelled, etc.)</li>
                <li>Update: modify an order (add/remove items, change status, etc.)Order 2</li>
                <li>Delete: remove an order from the order history</li>
            </ul>
            <OrderTable />
        </div>
    );
};

