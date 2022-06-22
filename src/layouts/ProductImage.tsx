import { Box, Grid, Typography, Backdrop, Stack, IconButton, useTheme } from '@mui/material'
import React, { PropsWithoutRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from './Carousel'

import { allImages } from '../shared/data'
import { StoreState } from '../shared/redux/store';
import { ReducerState,changeImage } from './../shared/redux/reducer';

import {
    IoMdClose as CloseIcon
} from 'react-icons/io'

interface ModalType {
    open:boolean,
    setOpen:Function
}

let Modal = ({open,setOpen}: PropsWithoutRef<ModalType>)=>{

    return <Backdrop open={open} sx={{zIndex:1000}}>
        <Box sx={{display:'block',maxWidth:"500px",mx:'auto',height:'100%'}}>
            <Stack spacing={2} justifyContent="center">
                <IconButton
                    sx={{
                        color:'white',ml:'auto',
                        '&:hover':{
                            color:'primary.main'
                        }
                    }}
                    onClick={()=>setOpen(false)}
                >
                    <CloseIcon color="inherit" fontSize="40px" />
                </IconButton>
                <Carousel/>
                <Box sx={{px:3,pt:2}}>
                    <SmallImage/>
                </Box>
            </Stack>
        </Box>
    </Backdrop>
}

let SmallImage = ()=>{
    let {imageIndex} = useSelector<StoreState,ReducerState>((store)=>store.product)
    let dispatcher = useDispatch()

    return <Grid container spacing={3}>
        {
            [1,2,3,4].map((index)=>{
                return <Grid item key={index} xs={3}>
                    <Box sx={{
                        borderRadius:3,cursor:'pointer',
                        height:'fit-content',width:'100%',position:'relative',
                        backgroundRepeat:'no-reapeat',backgroundPosition:'center',
                        backgroundSize:'cover',backgroundImage:`url(/images/image-product-${index}.jpg)`,
                        '&::after':{
                            content:"''",position:'absolute',width:1,height:1,top:0,left:0,backgroundColor:'white',
                            opacity:(imageIndex === index-1 ? 0.8 : 0),borderRadius:3,transition:'0.3s',cursor:'pointer',
                        },
                        '&:hover::after':{opacity:0.6},
                        ...(imageIndex === index-1 && {
                            border:'3px solid',borderColor:'primary.main'
                        })
                    }}
                    onClick={()=>dispatcher(changeImage(index-1))}
                    >
                        <img src="/images/image-product-1.jpg" alt="Product" width="100%" height="auto" style={{opacity:0}} />
                    </Box>
                </Grid>
            })
        }
    </Grid>
}

const ProductImage = () => {
    let {imageIndex} = useSelector<StoreState,ReducerState>((store)=>store.product)
    let imageSelected = allImages[imageIndex]

    let func = true

    let [openModal,setOpenModal] = React.useState(false)
    let [notSlide,setNotSlide] = React.useState(true)

    let theme = useTheme()

    let slideCarousel = React.useCallback(()=>{
        if(window.innerWidth > theme.breakpoints.values.md){
            if(!notSlide){
                setNotSlide(true)
            }
        }else{
            if(notSlide){
                setNotSlide(false)
            }
        }
    },[notSlide])

    React.useEffect(()=>{
        slideCarousel()
        window.addEventListener('resize',slideCarousel)
    },[func])
    
    let funcModal = React.useCallback(()=>{
        if(window.innerWidth > theme.breakpoints.values.md){
            setOpenModal(!openModal)
        }
    },[openModal,window.innerWidth])

    return (
        <>
            <Box component="section">
                <Typography component="h2" sx={{width:0,height:0,m:0,p:0,textIndent:'-100000px'}}>Product Image</Typography>
                <Box onClick={funcModal} sx={{cursor:'pointer'}}>
                    <Carousel notSlide={notSlide}/>
                </Box>
                <Box sx={{display:{xs:'none',md:'block'},mt:3,width:'100%'}}>
                    <SmallImage/>
                </Box>
            </Box>
            <Modal open={openModal} setOpen={setOpenModal} />
        </>
    )
}

export default ProductImage