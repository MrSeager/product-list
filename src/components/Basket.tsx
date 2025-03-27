import React, { FC, useState, useEffect } from 'react';
//Components
import BasketItem from './BasketItem.tsx';
//Bootstrap
import { Container, Col, Image, Button } from 'react-bootstrap';
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
    itemsSum: number;
    setBasketItems: (basketItems: itemsProp[]) => void;
    handleShow: () => void;
}

const Basket: FC<BasketProps> = ({ basketItems, itemsSum, setBasketItems, handleShow }) => {
    const [itemsAmount, setItemsAmount] = useState<number>(0);
    
    useEffect(() => {
        const totalAmount = basketItems.reduce((sum, item) => sum + item.amount, 0);
        setItemsAmount(totalAmount);
    }, [basketItems]);

    const handleDeleteItem = (index: number) => {
        const updatedItems = basketItems.filter((_, i) => i !== index);
        setBasketItems(updatedItems); // Update the basket state
    };

    const anim = useSpring ({
        from: { x: '200px', opacity: 0 },
        to: { x: '0px', opacity: 1 },
        config: { tension: 110, friction: 10 },
        delay: 200
    });

    return (
        <Col lg={3} xs={12} className='px-lg-3 p-0'>
            <animated.div style={anim} className='bg-white p-4 rounded rounded-3'>
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
                            <Button onClick={handleShow} className='rounded-pill py-2 border-0 cs-btn-confirm cs-transition'>Confirm Order</Button>
                        </Container>
                    ) : ''}
                </Container>
            </animated.div>
        </Col>
    );
}

export default Basket;