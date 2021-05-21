import React from "react";

import {Container, Header, Segment, Grid, Button, Image } from 'semantic-ui-react'


function Hero() {

    return (
      <Segment style={{ padding: '2em 0' }} >
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '1.5em' }}>
                The Furniture Company That Cares!
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your house the details that it needs to be special!
              </p>
              <Header as='h3' style={{ fontSize: '1.5em' }}>
                We Make Only Quality Pieces!
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but we only sell perfectly built furniture.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <Image bordered rounded size='large' src='https://res.cloudinary.com/david-j-forer/image/upload/v1620893736/samples/imagecon-group.jpg' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <h2>Check Out Our Popular Pieces</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
    )
    }
        
    export default Hero
