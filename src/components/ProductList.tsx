import React, { FC, useState, useEffect } from 'react';
//Components
import './ProductListStyle.css';
import ItemsList from './ItemsList.tsx';
import Basket from './Basket.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Modal, Button, Image } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Axios
import axios from 'axios';
//Image
import ConfirmedImg from '../assets/images/icon-order-confirmed.svg';

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
                    handleShow={handleShow}
                    itemsSum={itemsSum}
                />
            </Row>
            <Modal centered show={orderShow} onHide={handleClose}>
                <Modal.Header className='border-0 px-4 d-flex flex-column align-items-start gap-0'>
                    <Image fluid src={ConfirmedImg} alt='order confirmed img' />
                    <Modal.Title className='mt-3 fs-2 cs-fw-700 cs-fc-one'>Order Confirmed</Modal.Title>
                    <p className='m-0 cs-fc-two'>We hope you enjoy your food!</p>
                </Modal.Header>
                <Modal.Body className='px-4'>
                    <Container className='rounded rounded-3 cs-bg-three px-4 py-2 d-flex flex-column'>
                        {basketItems.length > 0 ? (
                            basketItems.map((item, index) => (
                                <Row className='py-3 border-bottom'>
                                    <Col xs={2}>
                                        <Image 
                                            fluid 
                                            src={'https://raw.githubusercontent.com/MrSeager/product-list/refs/heads/main/src' + item.image.thumbnail.replace('.', '')} 
                                            alt='item image'
                                            className='rounded rounded-3'
                                        />
                                    </Col>
                                    <Col xs={8} className='d-flex flex-column align-items-start justify-content-around'>
                                        <h5 className='m-0 cs-fw-600 cs-fc-one'>{item.name}</h5>
                                        <Container className='px-0 d-flex flex-row gap-3'>
                                            <p className='m-0 cs-fw-600 cs-fc-three'>{item.amount}x</p> 
                                            <p className='m-0 cs-fc-two'>@ ${item.price.toFixed(2)}</p>
                                        </Container>
                                    </Col>
                                    <Col xs={2} className='d-flex flex-column align-items-end justify-content-center'>
                                        <h5 className='text-end cs-fw-600 cs-fc-one'>${item.sum.toFixed(2)}</h5>
                                    </Col>
                                </Row>
                            )
                        )) : ''}
                        <Container className='d-flex flex-row align-items-center justify-content-between px-0 pt-4 pb-3'>
                            <p className='m-0 cs-fc-one'>Order Total</p>
                            <h5 className='h4 cs-fw-700 cs-fc-one'>${itemsSum.toFixed(2)}</h5>
                        </Container>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='border-0 px-4 py-4'>
                    <Button className='cs-btn-confirm border-0 w-100 rounded-pill py-2' variant="primary" onClick={handleNewOrder}>
                        Start New Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProducList;