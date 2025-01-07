import { Drawer,Box,Typography,styled} from "@mui/material"
import Profile from "../Profile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const drawerStyle={
    left:20,
    top:14,
    height:'96%',
    width:'35%',
    boxShadow:'none'
}
const Text=styled(Typography)`
 font-size: 18px;
`;
const Header=styled(Box)`
   background: #333;
   height :107px;
   color: #FFFFFF;
   display: flex;
   &> svg, &>p{
     margin-top:auto;
     padding: 15px;
     font -weight: 600;
   }
`
const Infodrawer=({open,setOpen})=>{
    const handleClose=()=>{
        setOpen(false);
    }
   return(
    <Drawer
       open={open}
       onClose={handleClose}
       PaperProps={{sx:drawerStyle}}
       style={{zIndex:1500}}
    >
      <Header>
        <ArrowBackIcon onClick={()=>setOpen(false)}/>
        <Text>Profile</Text>
      </Header>
      <Profile/>
    </Drawer>
   )
}
export default Infodrawer