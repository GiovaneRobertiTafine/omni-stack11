import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api';

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    {/*Na funcao navigationToDetail, esta recebendo um parametro incident, e quando navegar para a rota Detail ele vai passar esse incident no segundo parametro */}
    function navigationToDetail(incident) {
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', { params: {page} });

        {/*A função abaixo esta anexando todos os elementos dos incidents com spread operator e response.data a um unico vetor*/}
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de
                    <Text style={styles.headerTextBold}> {total} </Text> 
                    casos
                </Text>
            </View>

                <Text style={styles.title}>Bem-Vindo</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
            {/*Em FlatList a propriedade renderTime esta sendo utilizada para renderizar o layout.
            Recebendo uma função que um jsx, para escrever jsx é preciso colocar entre parenteses.
            
            A propriedade keyExtractor serve para receber cada conteudo da listagem, e ver o conteudo em comum entre eles
            
            A propriedade onEndReached executa uma funcao sempre que chegar no final da lista
            
            A propriedade onEndReachedThreshold a partir da porcetagem colocada de 0 a 1 ele vai carregar novos itens*/}
            <FlatList data={incidents} 
                    style={styles.incidentList} 
                    keyExtractor={incident => String(incident.id)} 
                    // showsVerticalScrollIndicator={false}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: incident }) => ( 
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>Valor:</Text>
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                            <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#e02041" />
                            </ TouchableOpacity>
                        </View>
                )}
            />

            {/* <View style={styles.incidentList}>
                
            </View> */}
        </View>
            
    );
}
