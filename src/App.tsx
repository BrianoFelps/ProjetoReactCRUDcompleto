import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import './App.css'

interface User{
  id: number;
  idCat: number;
  idMar: number;
  cat: string;
  mar: string;
  prod: string;
  descr: string;
  preco: string;
  quant: number;
}

function App() {
  // Guardar lista de produtos
  const [users, setUsers] = useState<User[]>([]);
  // Manipular campo de texto para novo nome de usuario ou alteração
  const [userName, setUserName] = useState("");
  const [selectedCat, setSelectedCat] = useState(""); 
  const [selectedMar, setSelectedMar] = useState(""); 

  // Guardar Id selecionado
  const [selectedId, setSelectedId] = useState(-1);
  const [selectedIdCat, setSelectedIdCat] = useState(Number);
  const [selectedIdMar, setSelectedIdMar] = useState(Number);
  const [SelectedDesc, setSelectedDesc] = useState("");
  const [selectedPrec, setSelectedPrec] = useState("");
  const [selectedQuant, setSelectedQuant] = useState(Number);


  // async = assincrono, para que não trave o sistema, rodando em segundo plano
  const handleGetUsers = async () => {
    const res = await axios.get("http://localhost:8080/prods");

    setUsers(res.data);
  }

  const handleAddOrUpdteUser = async () =>{
    if (selectedId < 0) {
      await axios.post("http://localhost:8080/prods", {
        cat: selectedIdCat,
        mar: selectedIdMar,
        prod: userName,
        descricao: SelectedDesc,
        preco: selectedPrec,
        quantidade: selectedQuant
      });

      alert(`${userName} inserido adequadamente`);

      handleGetUsers();

      setSelectedIdCat(Number);
      setSelectedIdMar(Number);
      setUserName("");
      setSelectedDesc("");
      setSelectedPrec("");
      setSelectedQuant(Number);
    }else{
      await axios.put("http://localhost:8080/prods", {
        id: selectedId,
        cat: selectedIdCat,
        mar: selectedIdMar,
        prod: userName,
        descr: SelectedDesc,
        preco: selectedPrec,
        quant: selectedQuant
      });

      alert ('Produto alterado com êxito');

      handleGetUsers();
      resetFormFields();
    }
  }

  const resetFormFields = () => {
    setSelectedId(-1);
    setSelectedIdCat(Number);
    setSelectedIdMar(Number);
    setUserName("");
    setSelectedDesc("");
    setSelectedPrec("");
    setSelectedQuant(0);
  }

  // Usados só para API'S
  const handleSelectUser = (id: number) => {
    const user = users.find((user: User) => user.id === id);

    if(user){
      setUserName(user.prod);
      setSelectedId(user.id);
      setSelectedIdCat(user.idCat);
      setSelectedCat(user.cat);
      setSelectedIdMar(user.idMar);
      setSelectedMar(user.mar);
      setSelectedDesc(user.descr);
      setSelectedPrec(user.preco);
      setSelectedQuant(user.quant);
    }
  }

  const handleDeleteUser = async (id: number) =>{
    // O url usa, após o "?", o id.
    await axios.delete(`http://localhost:8080/prods?id=${id}`);

    alert("Produto removido com êxito")

    handleGetUsers();
  }

  const handleOnInputChangeProd = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  // const handleOnInputChangeCatg = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedCat(e.target.value);
  // }
  // const handleOnInputChangeMarca = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedMar(e.target.value);
  // }
  const handleOnInputChangeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDesc(e.target.value);
  }
  const handleOnInputChangePreco = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPrec(e.target.value);
  }
  const handleOnInputChangeQuant = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedQuant(e.target.valueAsNumber);
  }

  return (
    <>
      <input placeholder='Digite o nome do produto aqui' onChange={handleOnInputChangeProd}
      value={userName.length > 0 ? userName : ""} type="text"/>

      <input placeholder='Categoria'
      value={selectedCat.length > 0 ? selectedCat : ""} type="text" readOnly/>
      
      {/* <input placeholder='IDCATEGORIA'
      value={selectedIdCat > 0 ? selectedIdCat : 0} type="text" readOnly/> */}

      <input placeholder='Marca'
      value={selectedMar.length > 0 ? selectedMar : ""} type="text" readOnly/>

      {/* <input placeholder='IDMARCA'
      value={selectedIdMar > 0 ? selectedIdMar : 0} type="text" readOnly/> */}

      <input placeholder='Digite a descrição do produto aqui' onChange={handleOnInputChangeDesc}
      value={SelectedDesc.length > 0 ? SelectedDesc : ""} type="text"/>

      <input placeholder='Digite o preço do produto aqui' onChange={handleOnInputChangePreco}
      value={selectedPrec.length > 0 ? selectedPrec : ""} type="text"/>

      <input placeholder='Digite a quantidade do produto aqui' onChange={handleOnInputChangeQuant}
      value={selectedQuant > 0 ? selectedQuant : 0} type="Number"/>

      <button onClick={handleAddOrUpdteUser}>Salvar</button>
      <button onClick={handleGetUsers}>Listar</button>

      <table style={{margin: "100px 0"}}>
        <tbody>
          <tr>
            <th>ID</th>
            <th style={{width: "500px"}}>CATEGORIA</th>
            <th style={{width: "500px"}}>MARCA</th>
            <th style={{width: "500px"}}>PRODUTO</th>
            <th style={{width: "500px"}}>DESCRIÇÃO</th>
            <th style={{width: "500px"}}>PREÇO</th>
            <th style={{width: "500px"}}>QUANTIDADE</th>
            <th style={{width: "500px"}}>IDcategoria</th>
            <th style={{width: "500px"}}>IDmarca</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><input type="text" value={user.id} readOnly disabled/></td>
              <td><input type="text" value={user.cat} readOnly disabled/></td>
              <td><input type="text" value={user.mar} readOnly disabled/></td>
              <td><input type="text" value={user.prod} readOnly onClick={handleAddOrUpdteUser} disabled/></td>
              <td><input type="text" value={user.descr} readOnly disabled/></td>
              <td><input type="text" value={user.preco} readOnly disabled/></td>
              <td><input type="text" value={user.quant} readOnly disabled/></td>
              {/* <td><input type="text" value={user.idCat} readOnly disabled/></td> */}
              {/* <td><input type="text" value={user.idMar} readOnly disabled/></td> */}
              <td>
                <button onClick={() => {handleDeleteUser(user.id)}}>Remover</button>  
              </td>
              <td>
                <button onClick={() => {handleSelectUser(user.id)}}>Alterar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
