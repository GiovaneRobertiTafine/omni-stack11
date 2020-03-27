import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image , Text, TouchableOpacity, Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import styles from './styles'

import logoImg from '../../assets/logo.png'

export default function Detail() {
    const navigation = useNavigation();
    {/*Utilizando a classe useRoute, é possivel pegar os dados quando se navegar para ela, no exemplo fica dos incidents para detail */}
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato por que gostaria de ajudar no caso ${incident.title} com  ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;


    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['kstv23@hotmail.com'],
            body: message
        })
    }

    {/*Para acessar um aplicativo do celular é preciso de um deeplinking, é como se fosse uma url */}
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

                <View style={styles.concatBox}>
                    <Text style={styles.heroTitle}>
                        Salve o dia!
                    </Text>
                    <Text style={styles.heroTitle}>
                        Seja o herói desse caso.
                    </Text>

                    <Text style={styles.heroDescription}>
                        Entre em contato:
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
        </View>
    );
}
