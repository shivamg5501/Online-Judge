import React, { useEffect, useState, useContext } from 'react';
import {  Box,styled,Typography } from '@mui/material';
import axios from 'axios';
import { AccountContext } from '../../contest/AccountProvider';

const url = "http://localhost:8000";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
const Image=styled('img')({
  width : 200,
  height:  200,
  borderRadius:'50%',
  padding : '25px 0'
})
const BoxWrapper=styled(Box)`
  background: #FFFFFF;
  padding: 12px 3px 2px;
  box-shadow:0 1px 3px rgba(0 ,0,0,0.08);
  & :first-child{
    font-size: 13px;
    color: #009688;
    fonst-weight:200;
  }
  & :last-child{
    margin: 16px 0;
    color :#4a4a4a
  }
`

const Profile = () => {
  const { account } = useContext(AccountContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/User/${account.Id}`);
        setUserData(response.data); // Assuming the response contains the user data
        console.log(response.data);
        console.log("Pranjal is printing ",userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>; // You can show a loading indicator or a message
  }

  return (
    <>
      <ImageContainer>
      <Image src={account.ImageName} alt="dp"/>
      </ImageContainer>
      <BoxWrapper>
        <Typography>Your name</Typography>
        <Typography>{account.name}</Typography>
       </BoxWrapper>
       <BoxWrapper>
        <Typography>Total Problem Submission</Typography>
        <Typography>{userData.TotalSubmission}</Typography>
       </BoxWrapper>
       <BoxWrapper>
        <Typography>Contest</Typography>
        <Typography>{userData.Contest}</Typography>
       </BoxWrapper>
       <BoxWrapper>
        <Typography>Laguages Used</Typography>
        {userData.Languages && userData.Languages.length > 0 ? (
          <ul>
            {userData.Languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        ) : (
          <Typography>null</Typography>
        )}
       </BoxWrapper>
    </>
  );
};

export default Profile;
