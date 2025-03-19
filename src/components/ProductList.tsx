import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
import ItemsList from './ItemsList.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Axios
import axios from 'axios';
//Images
import EmptyImg from '../assets/images/illustration-empty-cart.svg';

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

const ProducList: FC = () => {
    const [items, setItems] = useState<itemsProp[]>([]);
    const [itemsAmount, setItemsAmount] = useState<number>(0);

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
                />
                <Col lg={3} xs={12}>
                    <Container className='bg-white p-4 rounded rounded-3 d-flex flex-column align-items-center gap-3'>
                        <h4 className='h5 w-100 cs-fc-three cs-fw-700'>Your Cart ({itemsAmount})</h4>
                        <Image fluid src={EmptyImg} alt='empty cart' />
                        <p className='cs-fc-two cs-fw-600'>Your added items will appear here</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default ProducList;