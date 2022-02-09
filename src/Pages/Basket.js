import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, styled} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDollarSign , faSearch } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {ADD_CARD} from "../Redux/reducers/productReducer";
import {Link} from "react-router-dom";


const Basket = () => {

    const card = useSelector((state) => state.product.card)
    const [price ,  setPrice] = useState(0)
    const [skidka , setSkidka] = useState(0)


    useEffect(() => {
        setPrice(card.reduce((acc , el) => {
            console.log(acc , 'acc')
            console.log(el , 'el')
            return el.quantity * el.price + acc
        },0))

        setSkidka(price / 100 * 3)
    })

const dispatch = useDispatch()
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2,5),
        color: theme.palette.text.secondary,

    }))

    const Item1 = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2,5),
        color: theme.palette.text.secondary,
        position: "fixed",
        width: "25%"
    }));


    // console.log(price)
    const pusRates = useSelector((state) => state.product.toggleRates)
    return (
        <div style={{paddingTop: "90px"}}>
            <Container style={{width:"1170px" , margin: "auto"}}>
                <h1>Корзина</h1>

                {
                    card.length > 0 ?
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={7}>
                            <Item>
                                {
                                    card.map(el => (
                                        <>
                                            <Grid style={{borderBottom: "1px solid rgba(0, 0, 0, 0.75)" , paddingTop: "20px"}} container spacing={2}>
                                                <Grid item xs={12} sm={3} md={3}>
                                                    <img width={"80%"} src={el.img[0]} alt=""/>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <h3>{el.name}</h3>
                                                    <h4>{el.nameTitle}</h4>
                                                    <h4>{el.color}</h4>
                                                    <div style={{display: "flex"}} className="">
                                                        <h5>Количество:</h5>
                                                        <select
                                                            defaultValue={el.quantity}
                                                            style={{border: "none" , outline: "none" , fontWeight: 600 , color: "rgba(0, 0, 0, 0.54);"}}
                                                            onChange={(e)=> dispatch({type:"ADD_QUANTITY" , payload: [e.target.value,el] })}
                                                        >

                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                            <option value={6}>6</option>
                                                            <option value={7}>7</option>
                                                            <option value={8}>8</option>
                                                            <option value={9}>9</option>
                                                            <option value={10}>10</option>
                                                        </select>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <h2>{(el.quantity * el.price * pusRates[0]).toFixed(2)}</h2>
                                                </Grid>
                                            </Grid>

                                        </>
                                    ))
                                }
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Item1>
                                <h2>Сведения:</h2>
                                <div style={{display: "flex" ,  justifyContent: "space-between"}}>
                                    <h3>Промежуточный итог <FontAwesomeIcon icon={faDollarSign}/> :</h3>
                                    <h3>{(price * pusRates[0]).toFixed(2)}</h3>
                                </div>
                                <div style={{display: "flex" ,  justifyContent: "space-between"}}>
                                    <h3>Доставки и обработки <FontAwesomeIcon icon={faDollarSign}/> :</h3>
                                    <h3>{(skidka * pusRates[0]).toFixed(2)}</h3>
                                </div>
                                <div className="vsego" style={{display: "flex" ,  justifyContent: "space-between"}}>
                                    <h3>Всего :</h3>
                                    <h3>{((price + skidka) * pusRates[0]).toFixed(2)}</h3>
                                </div>
                                <button className="addcards">Оформить заказ без регистрации</button>
                                <button className="addcards">Оформить заказ</button>
                                <div className="" style={{textAlign: "center" , paddingTop: "20px"}}>
                                    <a className="clujba" href="#">Служба поддержки ?</a>
                                </div>
                            </Item1>
                        </Grid>

                    </Grid>
                        :
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <div style={{display: "flex" , justifyContent: "space-between" , alignItems: "center"}} className="">
                                    <h2>Извените корзина пуста</h2>
                                    <Link to="/" style={{textDecoration: "none"}}><h3 style={{color: "rgba(0, 0, 0, 0.74)" }}>Выбрать товары <FontAwesomeIcon icon={faSearch}/></h3></Link>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                }

            </Container>

        </div>
    );
};

export default Basket;