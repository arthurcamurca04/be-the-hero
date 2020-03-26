import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi';
import './styles.css'
import api from '../../services/api'

import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function HandleLogon(e){
        e.preventDefault();
        try {
            const responde = await api.post('/session', {id})
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', responde.data.name);

            history.push('/profile')
        } catch (error) {
            alert('Login não efetuado, tente novamente!')
        }
    }

    return(
       <div className="logon-container">
           <section className="form">
                <img src={logo} alt="Be The Hero"/>

                <form onSubmit={HandleLogon}>
                    <h1>
                        Faça seu Logon
                    </h1>

                    <input type="text" 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}/>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register"><FiLogIn size={16} color="#e02401"></FiLogIn>Não tenho cadastro</Link>
                </form>
           </section>

           <img src={heroesImg} alt="Heroes"/>
       </div>
    );
};

export default Logon;