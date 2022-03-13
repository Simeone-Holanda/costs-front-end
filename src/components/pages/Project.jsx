import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')


    useEffect(() => {
        // setTimeout(() => {
        fetch(`http://127.0.0.1:8000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
        //}, 300)
    }, [id])

    function editPost(project) {
        setMessage('')

        //budget validation
        if (project.budget < project.cost) {
            setMessage('O Orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        if (project.category.id) {
            project.category = project.category.id
        }
        fetch(`http://127.0.0.1:8000/projects/${project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(!showProjectForm)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function createService(project_service, dataProject) {
        setMessage('')
        
        const newCost = parseFloat(project.cost) + parseFloat(project_service.cost)
        //validando o custo do serviço com base no orçamento
        if (newCost > parseFloat(dataProject.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        project_service.project = project.id

        //update projects
        fetch(`http://127.0.0.1:8000/services/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project_service)
        }).then((resp) => resp.json()
        ).then((data) => {
            dataProject.services.push(data)
            setShowServiceForm(false)
            setServices(dataProject.services)
            setMessage('Serviço adicionado!')
            setType('success')
        }).catch(err => console.log(err))

    }

    function removeService(service_id, cost) {
        setMessage('')
        const serviceUpdate = project.services.filter(
            (service) => service.id !== service_id
        ) // TODO:POSSIVEL PROBLEMAS AQ POIS ELE N TA PEGANDO O ID NA HR DE REMOVER

        const projectUpdate = project

        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)
        console.log('-=-=-=-=-=-=-=-=-=-=-')
        console.log(projectUpdate)
        fetch(`http://127.0.0.1:8000/services/${service_id}`, {
            method: "DELETE",
        }).then(resp => resp.json())
            .then(data => {
                setProject(projectUpdate)
                setServices(projectUpdate.services)
                setMessage('Serviço Removido!')
                setType('error')
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span> Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span> Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span> Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>

                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2> Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2> Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id + 5}
                                    handleRemove={removeService}
                                />
                            ))}
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )
            }
        </>
    )
}

export default Project