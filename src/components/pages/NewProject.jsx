import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'


function NewProject() {

    const history = useNavigate()

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        axios.post("http://127.0.0.1:8000/projects/", project).then((data) => {
            history('/projects', { state: { message: 'Projeto criado com sucesso!' } })
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={styles.newprojects_container}>
            <h1>Criar Projeto </h1>
            <p>Criei seu projeto para depois adicionar os serviços. </p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default NewProject;