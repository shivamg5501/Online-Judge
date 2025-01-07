import React from "react";
import ImageProfileDefault from "./Image";
import { useState } from "react";
import { Box,Typography,styled,Link } from "@mui/material";
import {Menu,MenuItem} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Infodrawer from "./Drawer/Drawer";
const MenuOption=styled(MenuItem)`
   font-size:14px;
   padding:15px 60px 5px 24px;
   color: #4A4A4A;
`
const Left=styled(Box)`
  display: flex;
  background:#333;
  height: 10vh;
`
const Text=styled(Typography)`
   font-size: 30px;
   font-weight:bold;
   color: #FFFFFF;
   padding-top: 19px;
    padding-left: 5px;
`
const Middle=styled(Box)`
    padding-top: 37px;
    padding-left: 23px;
    & > a {
        margin-right: 20px; 
        font-size: 18px; 
        color: #FFFFFF; 
        text-decoration: none; 
        padding-top: 36px;
      }
`
const Image = styled(Box)`
    margin-left: auto;
    padding-top: 20px;
`
const Nav=()=>{
    const [openDrawer,setOpenDrawer]=useState(false);
    const [open, setOpen] = useState(null);
    const navigate = useNavigate();
    const navigateToProfile = () => {
        handleClose();
      };
    const handleClick = (e) => {
        setOpen(e.currentTarget);
        console.log("pranajal is printing event =", e);
      };
      
      
  
    const handleClose = () => {
      setOpen(null);
    };
    return(
        <Left>
            <Box>
                <Text>Online Judge</Text>
            </Box>
            <Middle>
            <Link href="/problem" underline="always">{`Problems`}</Link>
            <Link href="/contest" underline="always">{`Contest`}</Link>
            </Middle>
            <Image>
             <ImageProfileDefault onClick={handleClick}/>
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                >
                <MenuOption onClick={()=>{
                    handleClose();
                    setOpenDrawer(true);
                    // setOpenDrawer(true);   
                }}><MenuOption onClick={navigateToProfile}>Profile</MenuOption></MenuOption>
                </Menu>
            </Image>
            <Infodrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </Left>
    )
}
export default Nav;