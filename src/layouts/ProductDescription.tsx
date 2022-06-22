import React from 'react'
import { Box, Button, Stack, Grid, Typography, IconButton } from '@mui/material'
import { 
    AiOutlineShoppingCart as CartIcon
} from 'react-icons/ai'
import { addToCart } from './../shared/redux/reducer';
import { useDispatch } from 'react-redux';
import { PropsWithoutRef } from 'react';

interface QtyProps {
    qty:number,
    setQty:Function
}

interface AddProps {
    qty:number
}

let Qty = ({qty,setQty}:PropsWithoutRef<QtyProps>)=>{

    return <Grid container alignContent="center" sx={{backgroundColor:'secondary.main',borderRadius:2}}>
        <Grid item xs={3}>
            <Box
                sx={{
                    color:'primary.main',width:'100%',textAlign:'center',fontSize:'2rem',fontWeight:'800',cursor:'pointer',
                    '&:hover':{
                        opacity:'0.7'
                    }
                }}
                onClick={()=>{
                    if(qty > 0){
                        setQty(qty-1)
                    }
                }}
            >-</Box>
        </Grid>
        <Grid item xs={6} sx={{textAlign:'center'}}>
            <Box sx={{
                width:'100%',textAlign:'center',fontSize:'1.25rem',height:'100%',
                display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'700'
            }}>{qty}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box
                sx={{
                    color:'primary.main',width:'100%',textAlign:'center',fontSize:'2rem',fontWeight:'800',cursor:'pointer',
                    '&:hover':{
                        opacity:'0.7'
                    }
                }}
                onClick={()=>setQty(qty+1)}
            >+</Box>
        </Grid>
    </Grid>
}

let Add = ({qty}:PropsWithoutRef<AddProps>)=>{

    let dispatcher = useDispatch()
    let funcAdd = ()=>{
        window.scrollTo(0,0)
        dispatcher(addToCart(qty))
    }

    return <Button
        variant="contained" color="primary"
        sx={{width:'100%',textTransform:'initial',height:'100%',fontWeight:'700',display:'flex',alignItems:'center'}}
        onClick={funcAdd}
    >
        <CartIcon fontSize="30px" color="white" style={{marginRight:'1rem'}} />
        Add To Cart
    </Button>
}

const ProductDescription = () => {
    let [qty,setQty] = React.useState(0)

    return (
        <Stack component="section" sx={{height:'100%',justifyContent:'center',pl:{md:8,xs:2},pr:{xs:2,md:0},pb:2}}>
            <Typography component="h2" sx={{width:0,height:0,m:0,p:0,textIndent:'-100000px'}}>Product Description</Typography>
            <Button color="primary" sx={{letterSpacing:'1px',width:'fit-content',fontWeight:'700'}}>Sneaky Company</Button>
            <Typography variant="h3" fontWeight="700">Fall Limited Edition Sneakers</Typography>
            <Typography component="p" color="grey.500" sx={{my:4,fontSize:'1.2rem'}}>
                These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.
            </Typography>
            <Box sx={{display:{xs:'flex',md:'initial'}, justifyContent:'space-between',alignItems:'center'}}>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <Typography fontWeight="700" fontSize="1.75rem">$125.00</Typography>
                    <Typography sx={{
                        backgroundColor:'primary.light',color:'primary.main',fontWeight:'700',
                        py:'0.125rem',px:'0.5rem',ml:1,borderRadius:1,fontSize:'1rem',
                    }}>50%</Typography>
                </Box>
                <Box>
                    <Typography color="secondary.dark" fontSize="1rem" sx={{textDecoration:'line-through'}}>$250.00</Typography>
                </Box>
            </Box>
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} md={4}>
                    <Qty qty={qty} setQty={setQty} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Add qty={qty} />
                </Grid>
            </Grid>
        </Stack>
    )
}

export default ProductDescription