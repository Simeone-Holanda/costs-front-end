import { useState, useEffect } from 'react'
import styles from './Message.module.css'


function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Definindo o tempo de exibição da message na tela
        if (!msg) {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])


    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}


export default Message