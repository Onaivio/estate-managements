import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = props => {

    return (
        <>
            <footer className="footer">
                <Container fluid={true}>
                    <Row>
                        <Col md={6}>{new Date().getFullYear()} © FiatPay.</Col>
                        <Col md={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                Develop by Payrosx Team
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
