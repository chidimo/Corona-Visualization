import React from 'react';

import { Container, Col, Row } from 'react-bootstrap';

export const ParentContainer = () => {
  return (
    <Container>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
};
