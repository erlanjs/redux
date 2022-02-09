import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {data} from "../Data";
import {Container, Grid, Paper, styled} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {ADD_RATED} from "../Redux/reducers/productReducer";


const NewProduct = () => {
    const params = useParams()
    const [product, setProduct] = useState(data[0])
    const [product1, setProduct1] = useState(product.products[params.idx])

    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const Item1 = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2,5),
        color: theme.palette.text.secondary,
        position: "fixed",
        width: "25%"
    }));

    const dispatch = useDispatch()
    const pusRates = useSelector((state) => state.product.toggleRates)
    const [save , setSave] = useState(true)

    const addRates = (el) => {
        dispatch({type: ADD_RATED, payload: el})
        setSave(false)
    }

    return (
        <div style={{paddingTop: "90px"}}>
            <Container style={{width: "1170px", margin: "auto"}}>
                <Grid container spacing={2}>
                    <Grid style={{textAlign: "center"}} item md={7}>
                        <Item>
                            {
                                product1.img.map(el => (

                                    <img style={{margin: "2px"}} width={"48%"} src={el} alt=""/>


                                ))
                            }
                        </Item>

                    </Grid>
                    <Grid item md={5}>
                        <Item1>
                            <h2>{product1.name}</h2>
                            <h3>{product1.nameTitle}</h3>
                            <h3>Цена: {(product1.price * pusRates[0]).toFixed(2)}</h3>
                            <p>{product1.description}</p>
                            <button className="addcards" onClick={() => dispatch({type: "ADD_CATALOG", payload: product1})}>Добавить в корзину</button>
                            <button onClick={() => addRates(product1)} className={save ? "addcards1" : "addcards2"}>{save ? "Избранное" : "Дабавьлено"} <FontAwesomeIcon icon={faHeart}/></button>
                            <div className="" style={{textAlign: "center" , paddingTop: "20px"}}>
                                <a className="clujba" href="#">Служба поддержки ?</a>
                            </div>
                        </Item1>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default NewProduct;