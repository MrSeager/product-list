import React, { FC, useState } from 'react';
//Components
import './ProductListStyle.css';
//Bootstrap
import { Container, Col, Image, Button } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import BasketImg from '../assets/images/icon-add-to-cart.svg';

interface Props {
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

interface basketItems extends Props {
    amount: number;
    sum: number;
}

interface ItemProps {
    item: Props;
    basketItems: basketItems[];
    setBasketItems: (basketItems: basketItems[]) => void;
}

const Item: FC<ItemProps> = ({ item, basketItems, setBasketItems }) => {
    const [switchBtn, setSwitchBtn] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);

    const handleIncrement = () => {
        if (amount < 99) {
            const newAmount = amount + 1;
            setAmount(newAmount);
    
            const existingItem = basketItems.find((basketItem) => basketItem.name === item.name);
    
            if (existingItem) {
                // Update existing item in the basket
                const updatedBasket = basketItems.map((basketItem) =>
                    basketItem.name === item.name
                        ? {
                              ...basketItem,
                              amount: basketItem.amount + 1,
                              sum: (basketItem.amount + 1) * basketItem.price,
                          }
                        : basketItem
                );
                setBasketItems(updatedBasket);
            } else {
                // Add new item to the basket
                const newItem: basketItems = {
                    ...item,
                    amount: 1,
                    sum: item.price,
                };
                setBasketItems([...basketItems, newItem]);
            }
        }
    };

    const handleDecrement = () => {
        if (amount > 0) {
            const newAmount = amount - 1;
            setAmount(newAmount);
    
            const existingItem = basketItems.find((basketItem) => basketItem.name === item.name);
    
            if (existingItem) {
                if (existingItem.amount > 1) {
                    // Update item in the basket
                    const updatedBasket = basketItems.map((basketItem) =>
                        basketItem.name === item.name
                            ? {
                                  ...basketItem,
                                  amount: basketItem.amount - 1,
                                  sum: (basketItem.amount - 1) * basketItem.price,
                              }
                            : basketItem
                    );
                    setBasketItems(updatedBasket);
                } else if (existingItem.amount === 1) {
                    // Remove item from the basket
                    const updatedBasket = basketItems.filter(
                        (basketItem) => basketItem.name !== item.name
                    );
                    setBasketItems(updatedBasket);
                }
            }
        } else {
            // Remove the item from the basket when amount reaches 0
            const updatedBasket = basketItems.filter(
                (basketItem) => basketItem.name !== item.name
            );
            setBasketItems(updatedBasket);
            setSwitchBtn(false);
        }
    };

    return (
        <Col lg={4} md={6} xs={12} className='d-flex flex-column'>
            <Container className='p-0 position-relative mb-5'>
                <Image 
                    fluid 
                    src={'https://raw.githubusercontent.com/MrSeager/product-list/refs/heads/main/src' + item.image.desktop.replace('.', '')} 
                    alt='item image'
                    className={`cs-transition rounded rounded-3 cs-border${switchBtn ? '-red' : ''}`}
                />
                {!switchBtn ?
                <Button onClick={() => setSwitchBtn(true)} className='position-absolute rounded-pill bg-white cs-fw-600 cs-btn cs-pos py-2 w-50 cs-transition'><Image src={BasketImg} alt='basket ing' /> Add to Cart</Button>
                : 
                <Container className='cs-bg-two position-absolute rounded-pill cs-fw-600 cs-pos w-50 d-flex flex-row align-items-center justify-content-around'>
                    <Button onClick={handleDecrement} className='py-0 px-2 bg-transparent cs-transition rounded-circle cs-btn-two cs-fw-600'>-</Button>
                    <p className='text-white my-2'>{amount}</p>
                    <Button onClick={handleIncrement} className='py-0 px-2 bg-transparent cs-transition rounded-circle cs-btn-two cs-fw-600'>+</Button>
                </Container>
                }
            </Container>
            <Container className='p-0 d-flex flex-column gap-2 mb-5'>
                <h2 className='h5 cs-fc-two m-0'>{item.category}</h2>
                <h3 className='h4 cs-fc-one cs-fw-600 m-0'>{item.name}</h3>
                <h4 className='h5 cs-fc-three cs-fw-600 m-0'>${item.price.toFixed(2)}</h4>
            </Container>
        </Col>
    );
}

export default Item;