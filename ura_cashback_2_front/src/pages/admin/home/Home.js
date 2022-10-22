import React, {Component} from 'react';
import uraImg from "./img/header-logo/ura-logo.svg";
import uraStile from "./img/header-logo/ellipse.png";
import "./home.css";
import HomeNavbar from "./HomeNavbar";

class Home extends Component {
    render() {
        return (
            <div id="salom" className="main-div">
                <HomeNavbar/>
                <img className="uraStile"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-back" src={uraStile} alt="Loading..."/>
                <img className="uraImg"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-back" src={uraImg} alt="Loading..."/>

                <h1 className="box">Siz mijozlar sonini ko'paytirishni xohlaysizmi yoki shunchaki mavjudlarini yo'qotmasliknimi?</h1>
                <h1 className="box1">"Ura! cashback "sizning qaroringiz. Mijozlar har doim siz bilan birga bo'lishlari uchun ularni qanday xursand qilish haqida ko'proq bilib oling!</h1>

            </div>
        );
    }
}

Home.propTypes = {};

export default Home;
