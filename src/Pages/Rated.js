import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Container, Grid, IconButton, Paper, styled} from "@material-ui/core";
import {ADD_RATED, REMOVE_RATED} from "../Redux/reducers/productReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Rated = () => {

    const rated = useSelector((state) => state.product.rated)

    const dispatch = useDispatch()

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

    const addCard = (el) => {
        dispatch({type: "ADD_CATALOG", payload: el})
    }

    return (
        <div style={{paddingTop: "90px"}}>
            <Container style={{width:"1170px" , margin: "auto"}}>
                <h1>Избраное</h1>
                <Grid container spacing={2}>
                    {
                        rated.length > 0 ?
                            <Grid container spacing={2}>
                                {
                                    rated.map((el, idx) => (
                                        <>
                                            <Grid key={el.id} item xs={12} sm={6} md={4}>
                                                <Item>
                                                    <img style={{width: "100%"}} src={el.img[0]} alt=""/>
                                                    <div className="" style={{display: "flex" , justifyContent: "space-between"}}>
                                                        <a className="a-act" href="#"><h3>{el.name}</h3></a>
                                                        <IconButton onClick={() => dispatch({type: REMOVE_RATED, payload: el})} aria-label="card">
                                                            <StyledBadge color="secondary">
                                                                <FontAwesomeIcon style={{color: `${el.color}`}} icon={faHeart} />
                                                            </StyledBadge>
                                                        </IconButton>
                                                    </div>
                                                    <h4>{el.nameTitle}</h4>
                                                    <h4>Доступно цветов: {el.color}</h4>
                                                    <Button onClick={() => addCard(el)} color="secondary" variant={"contained"}>Добавить в корзину ... <FontAwesomeIcon icon={faShoppingCart}/></Button>
                                                </Item>
                                            </Grid>
                                        </>
                                    ))
                                }

                            </Grid>
                            :
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <Item>
                                        <div style={{display: "flex" , justifyContent: "space-between" , alignItems: "center"}} className="">
                                            <h2>Извените тут пусто ...</h2>
                                            <Link to="/" style={{textDecoration: "none"}}><h3 style={{color: "rgba(0, 0, 0, 0.74)" }}>Выбрать товары <FontAwesomeIcon icon={faSearch}/></h3></Link>
                                        </div>
                                    </Item>
                                </Grid>
                            </Grid>

                    }
                </Grid>


            </Container>

        </div>
    );
};

export default Rated;