import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
//Bootstrap
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import BasketImg from '../assets/images/icon-add-to-cart.svg';

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

interface ItemsListProps {
    items: itemsProp[];
}

const ItemsList: FC<ItemsListProps> = ({ items }) => {
    return (
        <Col as={Row} lg={9} xs={12}>
            <h1 className='cs-fc-one cs-fw-700 mb-4'>Desserts</h1>
            {items.length > 0 ? (
                items.map((item, index) => (
                    <Col lg={4} md={6} xs={12} className='d-flex flex-column'>
                        <Container className='p-0 position-relative mb-5'>
                            <Image 
                                fluid 
                                src={'https://raw.githubusercontent.com/MrSeager/product-list/refs/heads/main/src' + item.image.desktop.replace('.', '')} 
                                alt='item image'
                                className='rounded rounded-3'
                            />
                            <Button className='position-absolute rounded-pill bg-white cs-fw-600 cs-btn cs-pos py-2 w-50 cs-transition'><Image src={BasketImg} alt='basket ing' /> Add to Cart</Button>
                        </Container>
                        <Container className='p-0 d-flex flex-column gap-2 mb-5'>
                            <h2 className='h5 cs-fc-two m-0'>{item.category}</h2>
                            <h3 className='h4 cs-fc-one cs-fw-600 m-0'>{item.name}</h3>
                            <h4 className='h5 cs-fc-three cs-fw-600 m-0'>${item.price.toFixed(2)}</h4>
                        </Container>
                    </Col>
                )
            )) : <p>Loading....</p>}
        </Col>
    );
}

export default ItemsList;