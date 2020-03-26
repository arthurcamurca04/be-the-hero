import React, { useEffect, useState } from 'react'
import "./styles.css"
import Logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
     

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data.incidents)
        }).catch(e=>{
            console.error('Entrou no CATCH')
            console.warn(e)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`/incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso! Tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be The Hero" />
                <span>Bem-vindo, {ongName}</span>
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button"><FiPower size={18} color="#e02041"></FiPower></button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br',{style: 'currency', currency:"BRL"})
                        .format(incident.value)}</p>

                        <button onClick={()=> handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3"></FiTrash2></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;