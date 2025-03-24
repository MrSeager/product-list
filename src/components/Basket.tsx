import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
//Bootstrap
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
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
    amount: number;
    sum: number;
}

interface BasketProps {
    basketItems: itemsProp[];
    setBasketItems: (basketItems: itemsProp[]) => void;
}

const Basket: FC<BasketProps> = ({ basketItems, setBasketItems }) => {
    const [itemsAmount, setItemsAmount] = useState<number>(0);
    const [itemsSum, setItemsSum] = useState<number>(0);

    
    useEffect(() => {
        const totalAmount = basketItems.reduce((sum, item) => sum + item.amount, 0);
        setItemsAmount(totalAmount);
    }, [basketItems]);

    return (
        <Col lg={3} xs={12} className='p-lg-3 p-0'>
            <Container className='bg-white p-4 rounded rounded-3 w-100'>
                <h4 className='h5 w-100 cs-fc-three cs-fw-700'>Your Cart ({itemsAmount})</h4>
                {basketItems.length > 0 ? (
                    basketItems.map((item, index) => (
                        <Container as={Row} className='w-100 mx-0 px-0'>
                            <Col xs={10} className='px-0 mx-0'>
                                <h4 className='h6'>{item.name}</h4>
                                <Container className='px-0 d-flex flex-row align-items-start gap-3'>
                                    <p>{item.amount}x</p>
                                    <p>@ ${item.price.toFixed(2)}</p>
                                    <p>${item.sum.toFixed(2)}</p>
                                </Container>
                            </Col>
                            <Col xs={2} className='d-flex flex-column align-items-center justify-content-center'>
                                <Button>x</Button>
                            </Col>
                        </Container>
                    )
                )) : 
                    <Container className='p-0 d-flex flex-column align-items-center gap-3'>
                        <Image fluid src={EmptyImg} alt='empty cart' />
                        <p className='cs-fc-two cs-fw-600 text-center'>Your added items will appear here</p>
                    </Container>
                }
                
            </Container>
        </Col>
    );
}

export default Basket;