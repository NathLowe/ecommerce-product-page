import React, { PropsWithoutRef } from 'react'

import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { allImages } from '../shared/data'
import { StoreState } from '../shared/redux/store';
import { ReducerState,changeImage } from './../shared/redux/reducer';

import {
    IoMdClose as CloseIcon
} from 'react-icons/io'

import {
    HiOutlineChevronLeft as LeftIcon,
    HiOutlineChevronRight as RightIcon,
} from 'react-icons/hi'

interface CarouselType {
    notSlide?:boolean
}

const Carousel = (props:PropsWithoutRef<CarouselType>) => {

    let {notSlide} = props

    let dispatcher = useDispatch()

    let {imageIndex} = useSelector<StoreState,ReducerState>((store)=>store.product)
    let imageSelected = allImages[imageIndex]

    var slide = React.useCallback((side:'left'|'right')=>()=>{
        let totalImages:number = allImages.length
        if(side === 'left'){
            if(imageIndex == 0){
                dispatcher(changeImage(totalImages - 1))
            }else{
                dispatcher(changeImage(imageIndex - 1))
            }
        }else{
            if(imageIndex == totalImages - 1){
                dispatcher(changeImage(0))
            }else{
                dispatcher(changeImage(imageIndex + 1))
            }            
        }
    },[imageIndex,dispatcher])

    return (
        <Box sx={{
            position:'relative',
        }}>
            <Box sx={{
                width:{xs:'100%'},height:{xs:'250px',md:'fit-content'},borderRadius:{md:3},
                backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center',
                backgroundImage:`url(${imageSelected})`
            }}>
                <img src="/images/image-product-1.jpg" alt="Product" width="100%" height="auto" style={{opacity:0}} />
            </Box>
            {
                !notSlide && 
                <>
                    <Box sx={{
                        position:'absolute',top:'50%',left:{xs:"22px",md:"-22px"},transform:'translateY(-50%)',transition:'0.3s',
                        borderRadius:'50%',backgroundColor:'white',color:'black',cursor:'pointer',
                        width:'44px',height:'44px',display:'flex',justifyContent:'center',alignItems:'center',
                        '&:hover':{
                            color:'primary.main'
                        }
                    }}
                    onClick={slide('left')}
                    >
                        <LeftIcon fontSize="27px" color="inherit" />
                    </Box>
                    <Box sx={{
                        position:'absolute',top:'50%',right:{xs:"22px",md:"-22px"},transform:'translateY(-50%)',transition:'0.3s',
                        borderRadius:'50%',backgroundColor:'white',color:'black',cursor:'pointer',
                        width:'44px',height:'44px',display:'flex',justifyContent:'center',alignItems:'center',
                        '&:hover':{
                            color:'primary.main'
                        }
                    }}
                    onClick={slide('right')}
                    >
                        <RightIcon fontSize="27px" color="inherit" />
                    </Box>
                </>
            }
        </Box>
    )
}

export default Carousel