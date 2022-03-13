import styles from './Contact.module.css'

export default function Company() {
    return (
        <section className={styles.contact_card}>
            <h1>Empresa </h1>
            <h2>Quem somos nós ?</h2>
            <p>UM POUCO SOBRE NÓS </p>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.</p>
            <h3> Nos siga no instagram <span>@CostsOficial</span></h3>
        </section>
    )
}