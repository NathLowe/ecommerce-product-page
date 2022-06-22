import { Box, Grid } from '@mui/material';
import React from 'react';

import ProductDescription from './layouts/ProductDescription';
import ProductImage from './layouts/ProductImage';

function App() {
  return (
    <main>
      <Box sx={{p:{md:2},px:{md:6},mt:{xs:0,md:8}}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} >
            <ProductImage/>
          </Grid>
          <Grid item xs={12} md={7} sx={{flex:1}}>
            <ProductDescription/>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default App;
