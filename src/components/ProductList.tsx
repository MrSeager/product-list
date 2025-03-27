import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
import ItemsList from './ItemsList.tsx';
import Basket from './Basket.tsx';
import OrderList from './OrderList.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from 'react-bootstrap';
//Axios
import axios from 'axios';

interface itemsProp {
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
}

interface basketItems extends itemsProp {
    amount: number;
    sum: number;
}

const ProducList: FC = () => {
    const [items, setItems] = useState<itemsProp[]>([]);
    const [basketItems, setBasketItems] = useState<basketItems[]>([]);
    const [orderShow, setOrderShow] = useState<boolean>(false);
    const [itemsSum, setItemsSum] = useState<number>(0.00);

    const handleClose = () => setOrderShow(false);
    const handleShow = () => setOrderShow(true);

    const handleNewOrder = () => {
        handleClose();
        setBasketItems([]);
    }

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/product-list/refs/heads/main/src/data.json').then((response) => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        const totalSum = basketItems.reduce((sum, item) => sum + item.sum, 0);
        setItemsSum(totalSum);
    }, [basketItems]);

    return (
        <Container fluid className='min-vh-100 cs-bg-one p-5 overflow-hidden'>
            <Row className='px-0'>
                <ItemsList 
                    items={items}
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                />
                <Basket
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                    handleShow={handleShow}
                    itemsSum={itemsSum}
                />
            </Row>
            <OrderList 
                orderShow={orderShow}
                handleClose={handleClose}
                basketItems={basketItems}
                itemsSum={itemsSum}
                handleNewOrder={handleNewOrder}
            />
        </Container>
    );
}

export default ProducList;