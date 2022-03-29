import React, { useState, FormEvent } from "react";
import { Title, Form, Repositories, Error } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
import api from "../../services/api";
//import Repository from '../Repository/repository';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(""); //valor que irá entrar no input
  const [inputError, setInputError] = useState(""); //estado para definir error
  const [repositories, setRepositorioes] = useState<Repository[]>([]); //valor que ira ser consumido pela api

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepositorioes([...repositories, repository]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      if (!inputError) {
        setInputError("Digite autor/nome do repositório");
        return;
      }
      setInputError("Erro na busca por um repositório");
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Pesquise Repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
