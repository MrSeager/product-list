import React, { FC } from 'react';
//Components
import './ProductListStyle.css';
//Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

interface BasketItemProps {
    name: string;
    amount: number; 
    price: number;
    sum: number;
    onDelete: () => void;
}

const BasketItem: FC<BasketItemProps> = ({ name, amount, price, sum, onDelete }) => {
    return (
        <Container as={Row} className='w-100 mx-0 px-0 border-bottom'>
            <Col xs={10} className='px-0 mx-0'>
                <h4 className='h6 cs-fw-600 cs-fc-one'>{name}</h4>
                <Container className='px-0 d-flex flex-row align-items-start gap-3'>
                    <p className='cs-fw-600 cs-fc-three'>{amount}x</p>
                    <p className='cs-fc-two'>@ ${price.toFixed(2)}</p>
                    <p className='cs-fw-600 cs-fc-two'>${sum.toFixed(2)}</p>
                </Container>
            </Col>
            <Col xs={2} className='d-flex flex-column align-items-end px-0 justify-content-center'>
                <Button onClick={onDelete} className='cs-btn-close cs-transition bg-transparent p-0 rounded-circle'>&#x2716;</Button>
            </Col>
        </Container>
    );
}

export default BasketItem;