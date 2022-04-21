import { useState, useCallback } from "react";
import { FaGithub,FaPlus,FaSpinner,FaBars,FaTrash  } from "react-icons/fa";
import { Container, Form, SubmitButton,List,DeleteButton} from "./styles";
import { toast } from "react-toastify";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading,setLoading] = useState(false)


    const handleSubmit = useCallback((e) => {
            e.preventDefault();
            async function submit() {
                setLoading(true);
                try {
                    const response = await api.get(`repos/${newRepo}`);

                    const data = {
                        name: response.data.full_name,
                    };
                    setRepositorios([...repositorios, data]);
                    setNewRepo('');
                    toast.success('Repositorio encontrado com sucesso!')
                    
                } catch (error) {
                    console.log(error)
                    toast.error('Desculpa verificar o nome do repositrio')
                    
                }finally{
                 setLoading(false)
                }
            }
             
            submit();
        },[newRepo, repositorios]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback((repo)=>{
    const find = repositorios.filter(({name}) => name !== repo);
    setRepositorios(find)

    toast.success('Repositorio renovido com sucesso!')
  
  },[repositorios]);


  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adcionar Repositorios"
          value={newRepo}
          onChange={handleinputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
            {loading ?(
                <FaSpinner color="#fff" size={14}/> 
            ):(
                <FaPlus color="#fff" size={14} />
            )}
        </SubmitButton>
      </Form>

      <List>
       {repositorios.map(repo =>(
           <li key={repo.name}>
           <span>
               <DeleteButton onClick={()=>handleDelete(repo.name)}>
                 <FaTrash size={14}/>
               </DeleteButton>
                {repo.name}
             </span>
               <a href="">
                   <FaBars sizer={25}/>
               </a>
           </li>
       ))}
      </List>
    </Container>
  );
}
