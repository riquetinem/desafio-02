import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositorios, setRepositorios] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadRepositorios() {
      const response = await api.get('/repositories');

      setRepositorios(response.data);
    }

    loadRepositorios();
  }, [])

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title, url, techs
    });

    const repositorio = res.data;

    setRepositorios([...repositorios, repositorio])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositorios(repositorios.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorios && repositorios.map(repositorio => (
          
          <li key={repositorio.id}>
            {repositorio.title}

            <button onClick={() => handleRemoveRepository(repositorio.id)}>
              Remover
            </button>
          </li>


        ))}
      </ul>
      
      <br/>
      <hr/>
      <br/>

      <form>
        <label>Titulo</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <br/><br/>

        <label>URL</label>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)}/>
        <br/><br/>

        <label>Tecnologias</label>
        <input type="text" value={techs} onChange={e => setTechs(e.target.value)}/>
      </form>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
