import React, { FC, useState, useEffect } from 'react';
//Components
import BasketItem from './BasketItem.tsx';
//Bootstrap
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import EmptyImg from '../assets/images/illustration-empty-cart.svg';
import TreeImg from '../assets/images/icon-carbon-neutral.svg';

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
    const [itemsSum, setItemsSum] = useState<number>(0.00);
    
    useEffect(() => {
        const totalAmount = basketItems.reduce((sum, item) => sum + item.amount, 0);
        setItemsAmount(totalAmount);
    }, [basketItems]);

    useEffect(() => {
        const totalSum = basketItems.reduce((sum, item) => sum + item.sum, 0);
        setItemsSum(totalSum);
    }, [basketItems]);

    const handleDeleteItem = (index: number) => {
        const updatedItems = basketItems.filter((_, i) => i !== index);
        setBasketItems(updatedItems); // Update the basket state
    };

    return (
        <Col lg={3} xs={12} className='p-lg-3 p-0'>
            <Container className='bg-white p-4 rounded rounded-3 w-100'>
                <h4 className='h5 mb-3 w-100 cs-fc-three cs-fw-700'>Your Cart ({itemsAmount})</h4>
                <Container className='px-0 d-flex flex-column gap-3'>
                    {basketItems.length > 0 ? (
                        basketItems.map((item, index) => (
                            <BasketItem
                                name={item.name}
                                amount={item.amount} 
                                price={item.price}
                                sum={item.sum}
                                onDelete={() => handleDeleteItem(index)}
                            />
                        )
                    )) : 
                        <Container className='p-0 d-flex flex-column align-items-center gap-3'>
                            <Image fluid src={EmptyImg} alt='empty cart' />
                            <p className='cs-fc-two cs-fw-600 text-center'>Your added items will appear here</p>
                        </Container>
                    }
                    {basketItems.length > 0 ? (
                        <Container className='px-0 d-flex flex-column gap-3'>
                            <Container className='px-0 cs-fc-one d-flex flex-row align-items-center justify-content-between'>
                                <p className='m-0'>Order Total</p>
                                <h4 className='m-0 cs-fw-700'>${itemsSum.toFixed(2)}</h4>
                            </Container>
                            <Container className='cs-bg-three rounded py-3 cs-fc-two d-flex flex-row align-items-center justify-content-center gap-1'>
                                <Image fluid src={TreeImg} alt='tree img' />
                                <p className='cs-fs-7 m-0'>This is a <b>carbon-neutral</b> delivery</p>
                            </Container>
                            <Button className='rounded-pill py-2 border-0 cs-btn-confirm cs-transition'>Confirm Order</Button>
                        </Container>
                    ) : ''}
                </Container>
            </Container>
        </Col>
    );
}

export default Basket;