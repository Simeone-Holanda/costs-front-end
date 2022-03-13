import styles from './Contact.module.css'
import { BsWhatsapp, BsMailbox, BsInstagram, BsFillTelephoneFill } from 'react-icons/bs'
import contact from '../../img/contact-us.jpg'



export default function Contact() {
    return (
        <section className={styles.contact_card}>
            <h1> Contate-Nos </h1>


            <p><BsMailbox /> <span>Email:</span> costs@gmail.com </p>
            <p><BsWhatsapp /> <span>Whatsapp:</span> (83) 984793174</p>
            <p><BsFillTelephoneFill /> <span>Telefone:</span> (83) 984793174</p>
            <p className={styles.service_form_container}>
                <BsInstagram /> <span>Instagram:</span>
                <a href="https://www.instagram.com/costsOficial/"> @CostsOficial</a>
            </p>

            <p>
                <span>Horário de atendimento: <br /></span>
                - Seg à Sex das 9:00h às 17:30h <br />
                - Empresa Costs, 6789 - CJ 1234- 8º Andar,  Campinas,São Paulo, SP - 12345-678
            </p>

            <img src={contact} alt="Costs" />
        </section >

    )
}