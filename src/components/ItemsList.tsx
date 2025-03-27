import React, { FC } from 'react';
//Components
import Item from './Item.tsx';
//Bootstrap
import { Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

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

interface ItemsListProps {
    items: itemsProp[];
    basketItems: basketItems[];
    setBasketItems: (basketItems: basketItems[]) => void;
}

const ItemsList: FC<ItemsListProps> = ({ items, basketItems, setBasketItems }) => { 
    const anim = useSpring ({
        from: { x: '-200px', opacity: 0 },
        to: { x: '0px', opacity: 1 },
        config: { tension: 110, friction: 10 },
        delay: 200
    });

    return (
        <Col as={Row} lg={9} xs={12} className='mx-0'>
            <animated.div style={anim}>
                <h1 className='cs-fc-one cs-fw-700 mb-4'>Desserts</h1>
                <Row>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <Item 
                                item={item}
                                basketItems={basketItems}
                                setBasketItems={setBasketItems}
                            />
                        )
                    )) : <p>Loading....</p>}
                </Row>
            </animated.div>
        </Col>
    );
}

export default ItemsList;