import React, {useState} from 'react';
import "./styles.css"
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register() {

    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [whatsapp, setWhatsapp] = useState(''); 
    const [city, setCity] = useState(''); 
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function HandleRegister(event) {
        event.preventDefault();

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        });

        try {
            const response = await api.post('/ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/')
        } catch (error) {
            alert("Erro no cadastro, tente novamente!")
        }
  
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Hero" />
                    <h1>Cadastrar</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas
                    a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02401"></FiArrowLeft>
                        Não tenho cadastro</Link>
                </section>
                <form onSubmit={HandleRegister}>

                    <input type="text" 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={event => setName(event.target.value)} />

                    <input type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)} />

                    <input type="text" 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)} />

                    <div className="input-group">
                        <input type="text" placeholder="Cidade"
                        value={city}
                        onChange={event => setCity(event.target.value)} />

                        <input type="text" placeholder="UF" style={{ width: 80 }}
                        value={uf}
                        onChange={event => setUf(event.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}