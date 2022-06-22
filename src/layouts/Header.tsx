import React, { PropsWithChildren } from 'react'
import { Box, Typography, Badge, Avatar, Menu, ListItem, ListItemAvatar, ListItemText, ListItemIcon, IconButton, Divider, Button, Drawer } from '@mui/material'
import { 
  AiOutlineShoppingCart as CartIcon
} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { 
  BsTrash as TrashIcon
} from 'react-icons/bs'
import { StoreState } from '../shared/redux/store';
import { ReducerState,emptyCart } from './../shared/redux/reducer';

import {
  FiMenu as MenuIcon
} from 'react-icons/fi'
import {
  IoMdClose as CloseIcon
} from 'react-icons/io'


let Links = ()=>{

  let NavLink = (props:PropsWithChildren)=>{

    let {children} = props

    return <Typography component="li" sx={{
      mx:2,listStyleType:'none',height:{md:'100%'},color:{xs:'black',md:'secondary.dark'},transition:'0.3s',
      cursor:'pointer',position:'relative',border:'none',pr:{xs:2,md:0},py:{xs:1,md:0},
      '&::after':{
        content:"''",position:'absolute',bottom:0,left:0,height:'3px',
        backgroundColor:'primary.main',width:0,transition:'all ease-in-out 0.2s',
      },
      '&:hover':{
        color:'black'
      },
      '&:hover::after':{
        width:'100%'
      }
    }} >
      {children}
    </Typography>
  }

  let [open,setOpen] = React.useState(false)

  return <>
    <IconButton sx={{display:{md:'none'},zIndex:100}} onClick={()=>setOpen(!open)}>
      <MenuIcon fontSize="35px" />
    </IconButton>
    <Box sx={{display:{xs:'none',md:'flex'}}}>
      {
        ["Collections","Men","Women","About","Contact"].map((data,index)=>{
          return <NavLink key={index}>{data}</NavLink>
        })
      }
    </Box>
    <Drawer open={open} onClose={()=>setOpen(false)}>
      <IconButton sx={{width:'fit-content'}} onClick={()=>setOpen(!open)}>
        <CloseIcon fontSize="20px" />
      </IconButton>
      <Box sx={{mt:2}}>
        {
          ["Collections","Men","Women","About","Contact"].map((data,index)=>{
            return <NavLink key={index}>{data}</NavLink>
          })
        }
      </Box>
    </Drawer>
  </>
}

let LogoAndLinks = ()=>{

  return <Box sx={{
      flex:1,display:'flex',mt:1,flexDirection:{xs:"row-reverse",md:'row'},
      justifyContent:{xs:'flex-end',md:'flex-start'},alignItems:{xs:'center',md:'initial'}
    }}>
    <Box sx={{mr:{md:'2rem'},widht:{xs:'150px'},height:"20px"}} >
      <img src="/images/logo.svg" alt="Logo" width="100%" height="100%" />
    </Box>
    <Links/>
  </Box>
}

let Cart = ()=>{

  let {cart} = useSelector<StoreState,ReducerState>((state)=>state.product)
  let dispatcher = useDispatch()

  let [anchorEl,setAnchorEl] = React.useState<Element|null>(null)
  let [open,setOpen] = React.useState(false)

  let openMenu = React.useCallback(()=>{
    setAnchorEl(document.querySelector('.cart-icon'))
    setOpen(!open)
  },[])

  return <>
    <Badge color="primary" badgeContent={cart > 0 ? cart : undefined} sx={{cursor:'pointer'}}>
      <CartIcon className="cart-icon" fontSize={'30px'} color='primary' onClick={openMenu} />
    </Badge>
    <Menu
      open={open} variant="menu" anchorEl={anchorEl} onClose={()=>setOpen(false)}
      PaperProps={{sx:{minWidth:'200px'}}}
    >
      <ListItem>
        <ListItemText primary={"Cart"} primaryTypographyProps={{fontWeight:'500'}} />
      </ListItem>
      <Divider/>
      {
        cart > 0 ?
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="/images/image-product-1.jpg" variant="rounded" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography component="div" sx={{color:'text.disabled',fontSize:'1rem'}}>Fall Limited Edition Sneakers</Typography>}
              secondary={<Typography component="div" sx={{color:'text.disabled',fontSize:'1rem'}}>
                <span className="unit">$125.00</span> x <span className="qty">{cart}</span> <span style={{fontWeight:'500',color:'black'}} className="total">${125*cart}.00</span>
              </Typography>}
            />
            <ListItemIcon sx={{minWidth:'initial'}}>
              <IconButton
                onClick={()=>dispatcher(emptyCart())}
              >
                <TrashIcon color="inherit" fontSize="20px"/>
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" sx={{width:'100%',textTransform:'initial'}}>Checkout</Button>
          </ListItem>
        </>
        :
        <ListItem>
          <ListItemText
            primary={<Typography textAlign="center" component="div" color="grey.300">Your cart is empty.</Typography>}
          />
        </ListItem>
        
      }
    </Menu>
  </>
}

let User = ()=>{

  return <Avatar src="/images/image-avatar.png" sx={{
    width:{xs:'25px',md:'50px'},height:{xs:'25px',md:'50px'},cursor:'pointer',transition:'0.2s',border:'none',
    '&:hover':{
      border:'2px solid',borderColor:'primary.main',
    }
  }} />
}

let CartAndAvatar = ()=>{
  return <Box sx={{display:'flex',width:{xs:'80px',md:'120px'},height:'40px',justifyContent:'space-between',alignItems:'center',pr:2}}>
    <Cart/>
    <User/>
  </Box>
}

const Header = () => {
  return (
    <Box component="nav" sx={{
      display:'flex',height:'60px',borderBottom:'1px solid',borderBottomColor:'secondary.main',width:'100%',
      m:{md:2},alignItems:{xs:'center',md:'initial'}
      }}>
      <LogoAndLinks/>
      <CartAndAvatar/>
    </Box>
  )
}

export default Header