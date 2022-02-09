import React, {useEffect} from 'react';
import {
    Badge,
    Button,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    styled
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import {GET_RATES, PUSH_RESET} from "../Redux/reducers/productReducer";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


function ShoppingCartIcon() {
    return null;
}

const Header = () => {

    const card = useSelector((state) => state.product.card)
    const rated = useSelector((state) => state.product.rated)
    const rates = useSelector((state) => state.product.rates)

    const dispatch = useDispatch()

    useEffect(() => {
        axios("https://api.exchangerate.host/latest?base=KGS")
            .then(data => {
                dispatch({type:GET_RATES , payload: data.data.rates})
        })
    },[])

    return (
        <div style={{position: "fixed" , zIndex:"87"  , width: "100%", margin: "0 auto" , background: "#F3F3F3" }}>
            <Container style={{width:"1170px" , margin: "auto"}}>
                <div className="header-con">
                    <div className="logo">
                        <Link to="/"><Button><img src="https://images.unidays.world/i/customers/mobile/active/145a87b6-c372-49e7-a403-bf357eb75708" alt=""/></Button></Link>
                        <Link className="nav-item" to="/"><Button color="">Главная</Button></Link>
                        <a className="nav-item" href="#"><Button color="">О нас</Button></a>
                        <Link className="nav-item" to="/rated"><Button color="">Избранное</Button></Link>
                        <Link to="/basket" className="nav-item"><Button color="">Корзина</Button></Link>
                        <div>
                            <select onChange={(e) => dispatch({type: PUSH_RESET , payload: e.target.value})}>
                                {
                                    Object.keys(rates).map((el,idx ) => (
                                        <option value={`${el}`}>{el}</option>
                                    ))

                                }

                            </select>
                        </div>
                    </div>
                    <div className="">
                        <Link to="/rated">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={rated.length} color="secondary">
                                    <FontAwesomeIcon icon={faHeart} />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                        <Link to="/basket">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={card.length > 0 ? card.length : 0} color="secondary">
                                    <FontAwesomeIcon icon={faShoppingBasket} />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </Container>
            <hr/>
        </div>
    );
};

export default Header;