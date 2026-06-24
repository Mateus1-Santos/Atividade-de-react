/*Contexto: A empresa em que você trabalha, Custom Task LTDA, está planejando atualizar a
plataforma da empresa reorganizando a estrutura do site para usar react. E você é o responsável
por analisar a viabilidade e implantar o novo conteúdo em react.
Comando: Enquanto analisava a transição da empresa você se depara com os seguintes problemas
● Todas as partes de listagem de produtos e itens devem ser atualizadas, você sabe que os itens
são uma lista de dados que vem da api com os itens: imgURL, nome, preço, quantidade,
categoria e data de publicação. Esses itens devem ficar organizados dentro de cards.
● Também será criado um novo CRUD para a inserção de novos itens/produtos no sistema.
● Os cards devem ser apresentados um ao lado do outro, no máximo 4 itens por linha.
● É preciso salvar os dados de forma que as informações não sejam perdidas quando o browser
for fechado e reaberto.
Sabendo disse implemente a parte do código em que apresentará os itens no card, levando em
consideração que deve especificar o useState que ele será usado para ser apresentado, implementar a
estilização para que os cards sejam organizados de modo correto e as funções para salvar as
informações (as informações devem ser carregadas quando a página iniciar).*/

import { useState, useEffect } from "react";

const itensIniciais = [
  {
    id: 1,
    imgURL: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    nome: 'Fone Gamer',
    preco: 'R$ 249,90',
    quantidade: 12,
    categoria: 'Eletrônicos',
    dataPublicacao: '2026-05-10'
  },
  {
    id: 2,
    imgURL: 'https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=800&q=80',
    nome: 'Camiseta Estampada',
    preco: 'R$ 79,90',
    quantidade: 8,
    categoria: 'Moda',
    dataPublicacao: '2026-04-22'
  },
  {
    id: 3,
    imgURL: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    nome: 'Relógio Smart',
    preco: 'R$ 499,00',
    quantidade: 5,
    categoria: 'Acessórios',
    dataPublicacao: '2026-05-12'
  },
  {
    id: 4,
    imgURL: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    nome: 'Cadeira Gamer',
    preco: 'R$ 1.199,00',
    quantidade: 3,
    categoria: 'Móveis',
    dataPublicacao: '2026-05-03'
  }
];

export default function Dados() {
  const [produtos, setProdutos] = useState(() => {
    const salvo = localStorage.getItem('produtos');
    return salvo ? JSON.parse(salvo) : itensIniciais;
  });

  const [novoProduto, setNovoProduto] = useState({
    imgURL: '',
    nome: '',
    preco: '',
    quantidade: '',
    categoria: '',
    dataPublicacao: ''
  });

  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: value
    });
  }

  function adicionarProduto(e) {
    e.preventDefault();
    if (!novoProduto.nome.trim() || !novoProduto.imgURL.trim()) return;

    setProdutos([
      ...produtos,
      {
        id: Date.now(),
        imgURL: novoProduto.imgURL.trim(),
        nome: novoProduto.nome.trim(),
        preco: novoProduto.preco.trim() || 'R$ 0,00',
        quantidade: Number(novoProduto.quantidade) || 0,
        categoria: novoProduto.categoria.trim() || 'Sem categoria',
        dataPublicacao: novoProduto.dataPublicacao || new Date().toISOString().slice(0, 10)
      }
    ]);

    setNovoProduto({
      imgURL: '',
      nome: '',
      preco: '',
      quantidade: '',
      categoria: '',
      dataPublicacao: ''
    });
  }

  function removerProduto(id) {
    setProdutos(produtos.filter(produto => produto.id !== id));
  }

  return (
    <section className="dados-section">
      <h2>Cadastro de Produtos</h2>
      <form className="dados-form" onSubmit={adicionarProduto}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imgURL"
          placeholder="URL da imagem"
          value={novoProduto.imgURL}
          onChange={handleChange}
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={novoProduto.quantidade}
          onChange={handleChange}
          min="0"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={novoProduto.categoria}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataPublicacao"
          value={novoProduto.dataPublicacao}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      <div className="card-grid">
        {produtos.map(produto => (
          <article key={produto.id} className="card-item">
            <img src={produto.imgURL} alt={produto.nome} />
            <div className="card-content">
              <h3>{produto.nome}</h3>
              <p className="card-meta">{produto.categoria} • {produto.dataPublicacao}</p>
              <p className="card-price">{produto.preco}</p>
              <p>Estoque: {produto.quantidade}</p>
            </div>
            <button className="card-delete" onClick={() => removerProduto(produto.id)}>
              Excluir
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
