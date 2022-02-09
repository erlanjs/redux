import React, {useState} from 'react';
import {data} from "../Data";
import {Badge, Box, Container, Grid, IconButton, Paper, styled, Switch , Button} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart , faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {ADD_CARD, ADD_RATED} from "../Redux/reducers/productReducer";
import Product from "./Product";


const Home = () => {
    console.log(data)
    const [product , setProduct] = useState(data[0])
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const dispatch = useDispatch()

    const card = useSelector((state) => state.product.card)

    const addCard = (el) => {
        dispatch({type: "ADD_CATALOG", payload: el})
    }

    return (
        <div style={{paddingTop: "90px"}}>
           <Container style={{width:"1170px" , margin: "auto"}}>
               <Box sx={{ flexGrow: 1 }}>
                   <Grid container spacing={2}>

                       {
                           product.products.map((el , idx) => (
                               <>
                                   <Product el={el} id={idx} addCard={addCard} StyledBadge={StyledBadge} Item={Item} dispatch={dispatch}/>
                               </>
                           ))
                       }

                   </Grid>
               </Box>
           </Container>
        </div>
    );
};

export default Home;