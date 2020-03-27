import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../service/api';

import './styles.css';

import logo from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    
    // useEffect serve para disparar alguma função em algum momento no component
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then( response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Logo"/>
                <span>Bem vinda {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastros</h1>
                    {/*Sempre em um listagem é preciso colocar a propriedade key, 
                    no primeiro elemento, para ajudar encontrar qual item é qual*/}
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}> 
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        {/*Intl é uma classe global do javascript que serve para internacionalização*/}
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        {/*Em onClick nós colocamos uma funcao () => para que ao iniciar passe essa funcao
                        executar essa handleDeleteIncident(incident.id), que ao iniciar executaria e apagaria todos os casos */}
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}