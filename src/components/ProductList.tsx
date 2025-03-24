import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
import ItemsList from './ItemsList.tsx';
import Basket from './Basket.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
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

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/product-list/refs/heads/main/src/data.json').then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <Container fluid className='min-vh-100 cs-bg-one p-5'>
            <Row>
                <ItemsList 
                    items={items}
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                />
                <Basket
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                />
            </Row>
        </Container>
    );
}

export default ProducList;