import React, {useState} from 'react';
import {Button, Grid, IconButton} from "@material-ui/core";
import {ADD_RATED, REMOVE_RATED} from "../Redux/reducers/productReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Product = ({el, idx, addCard, StyledBadge, Item, dispatch}) => {
    const [addFlow, setAddFlow] = useState(false)
    const [addFlows, setAddFlows] = useState([])
    const pusRates = useSelector((state) => state.product.toggleRates)
    console.log(pusRates)
    console.log(idx)
    const addRated = (el) => {
        dispatch({type: ADD_RATED, payload: el})
        setAddFlow(true)
    }

    const removeRated = (el) => {
        dispatch({type: REMOVE_RATED, payload: el})
        setAddFlow(false)
    }

    return (
        <>


            <Grid key={el.id} item xs={12} sm={6} md={4}>
                <Item>
                    <Link className="a-act" to={`/${el.id}`}><img style={{width: "100%"}} src={el.img[0]} alt=""/></Link>
                    <div className="" style={{display: "flex", justifyContent: "space-between"}}>
                        <Link className="a-act" to={`/${el.id}`}><h3>{el.name}</h3></Link>
                        <IconButton onClick={() => addFlow ? removeRated(el) : addRated(el)} aria-label="card">
                            <StyledBadge color="secondary">
                                <FontAwesomeIcon style={{color: `${addFlow ? 'rgb(241,52,52)' : ''} `}} icon={faHeart}/>
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <h4>{el.nameTitle}</h4>
                    <h4>Доступно цветов: {el.color}</h4>
                    <h4>Цена: {(el.price * pusRates[0]).toFixed(2)}</h4>
                    <Button onClick={() => addCard(el)} color="secondary" variant={"contained"}>Добавить в корзину
                        ... <FontAwesomeIcon icon={faShoppingCart}/></Button>
                </Item>
            </Grid>


        </>
    );
};

export default Product;