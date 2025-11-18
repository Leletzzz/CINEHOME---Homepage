/**
 * Base de dados de filmes da CINEHOME
 * Dados extraídos de data.js e categories-data.js do frontend
 */

const MOVIES_DATA = {
  // Filmes em Alta
  trending: [
    { title: 'Avatar: O Caminho da Água', year: '2022', rating: '7.6', description: 'Jake Sully e sua família enfrentam novos desafios em Pandora.', image: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
    { title: 'Top Gun: Maverick', year: '2022', rating: '8.3', description: 'Maverick treina uma nova geração de pilotos.', image: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
    { title: 'John Wick 4: Baba Yaga', year: '2023', rating: '7.7', description: 'John Wick enfrenta seus inimigos mais poderosos.', image: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg' },
    { title: 'Homem-Aranha: Sem Volta Para Casa', year: '2021', rating: '8.2', description: 'Peter Parker lida com as consequências de sua identidade revelada.', image: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg' },
    { title: 'Doutor Estranho 2', year: '2022', rating: '6.9', description: 'O Doutor Estranho explora o multiverso e enfrenta novas ameaças.', image: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg' }
  ],

  // Mais Bem Avaliados
  topRated: [
    { title: 'O Senhor dos Anéis: O Retorno do Rei', year: '2003', rating: '9.0', description: 'A épica conclusão da trilogia do Senhor dos Anéis.' },
    { title: 'Batman: O Cavaleiro das Trevas', year: '2008', rating: '9.1', description: 'Batman enfrenta o caos causado pelo Coringa.' },
    { title: 'Duna', year: '2021', rating: '8.0', description: 'Paul Atreides viaja ao planeta mais perigoso do universo.' },
    { title: 'Parasita', year: '2019', rating: '8.5', description: 'Uma família pobre se envolve com uma família rica de maneira inesperada.' },
    { title: 'Interestelar', year: '2014', rating: '8.6', description: 'Uma equipe de astronautas viaja através de um buraco de minhoca em busca de um novo lar.' },
    { title: 'Um Sonho de Liberdade', year: '1994', rating: '9.3', description: 'Dois homens presos formam uma amizade ao longo dos anos.' },
    { title: 'O Poderoso Chefão', year: '1972', rating: '9.2', description: 'A saga da família Corleone no mundo do crime organizado.' },
    { title: 'A Viagem de Chihiro', year: '2003', rating: '8.6', description: 'Uma menina entra em um mundo mágico e deve trabalhar para salvar seus pais.' },
    { title: '12 Homens e uma Sentença', year: '1957', rating: '9.0', description: 'Um júri deve decidir o destino de um jovem acusado de assassinato.' },
    { title: 'Pulp Fiction: Tempo de Violência', year: '1994', rating: '8.8', description: 'Histórias entrelaçadas de crime e redenção em Los Angeles.' }
  ],

  // Suspense
  suspense: [
    { title: 'Parasita', year: '2019', rating: '8.5', description: 'Uma família pobre se envolve com uma família rica de maneira inesperada.' },
    { title: 'Shutter Island', year: '2010', rating: '8.1', description: 'Um detetive investiga o desaparecimento de uma paciente em um hospital psiquiátrico.' },
    { title: 'Prisioneiros', year: '2013', rating: '8.1', description: 'Um pai desesperado busca sua filha desaparecida.' },
    { title: 'Corra!', year: '2017', rating: '7.7', description: 'Um jovem descobre um terrível segredo durante uma visita aos pais de sua namorada.' },
    { title: 'Zodíaco', year: '2007', rating: '7.7', description: 'A caça ao serial killer que aterrorizou São Francisco.' },
    { title: 'Garota Exemplar', year: '2014', rating: '8.1', description: 'O desaparecimento de uma mulher revela segredos obscuros.' },
    { title: 'Seven: Os Sete Crimes Capitais', year: '1995', rating: '8.6', description: 'Dois detetives caçam um serial killer que usa os sete pecados capitais.' },
    { title: 'O Silêncio dos Inocentes', year: '1991', rating: '8.6', description: 'Uma agente do FBI busca ajuda de um serial killer canibal.' }
  ],

  // Comédia
  comedy: [
    { title: 'Guardiões da Galáxia', year: '2014', rating: '8.0', description: 'Um grupo improvável de heróis espaciais salva a galáxia.' },
    { title: 'Thor: Ragnarok', year: '2017', rating: '7.9', description: 'Thor deve impedir o Ragnarok, a destruição de Asgard.' },
    { title: 'Deadpool', year: '2016', rating: '8.0', description: 'Um mercenário com poderes de cura rápida busca vingança.' },
    { title: 'Jumanji: Bem-Vindo à Selva', year: '2017', rating: '7.0', description: 'Quatro adolescentes são sugados para dentro de um videogame.' },
    { title: 'As Branquelas', year: '2004', rating: '5.7', description: 'Dois agentes do FBI se disfarçam de socialites brancas.' },
    { title: 'Se Beber, Não Case!', year: '2009', rating: '7.7', description: 'Quatro amigos tentam reconstruir a noite caótica em Las Vegas.' },
    { title: 'Super Mario Bros. O Filme', year: '2023', rating: '7.1', description: 'Mario e Luigi embarcam em uma aventura no Reino dos Cogumelos.' },
    { title: 'Homem-Aranha no Aranhaverso', year: '2018', rating: '8.4', description: 'Miles Morales conhece outros Homens-Aranha de dimensões paralelas.' }
  ],

  // Ação
  action: [
    { title: 'John Wick 4: Baba Yaga', year: '2023', rating: '7.7', description: 'John Wick enfrenta seus inimigos mais poderosos.' },
    { title: 'Top Gun: Maverick', year: '2022', rating: '8.3', description: 'Maverick treina uma nova geração de pilotos.' },
    { title: 'Vingadores: Ultimato', year: '2019', rating: '8.4', description: 'Os Vingadores fazem uma última tentativa de reverter os danos de Thanos.' },
    { title: 'Mad Max: Estrada da Fúria', year: '2015', rating: '8.1', description: 'Em um deserto pós-apocalíptico, Max se junta a Furiosa.' },
    { title: 'Missão Impossível: Efeito Fallout', year: '2018', rating: '7.7', description: 'Ethan Hunt enfrenta uma corrida contra o tempo.' },
    { title: 'Batman: O Cavaleiro das Trevas', year: '2008', rating: '9.0', description: 'Batman enfrenta o caos causado pelo Coringa.' },
    { title: 'Avatar: O Caminho da Água', year: '2022', rating: '7.6', description: 'Jake Sully e sua família enfrentam novos desafios em Pandora.' },
    { title: 'Gladiador', year: '2000', rating: '8.5', description: 'Um general romano busca vingança como gladiador.' }
  ],

  // Terror
  horror: [
    { title: 'O Iluminado', year: '1980', rating: '8.4', description: 'Um escritor enlouquece enquanto trabalha como zelador de um hotel isolado.' },
    { title: 'O Exorcista', year: '1973', rating: '8.1', description: 'Uma menina possuída por uma entidade demoníaca.' },
    { title: 'Hereditário', year: '2018', rating: '7.3', description: 'Uma família assombrada por uma presença sinistra após a morte da matriarca.' },
    { title: 'Invocação do Mal', year: '2013', rating: '7.5', description: 'Investigadores paranormais ajudam uma família aterrorizada.' },
    { title: 'It: A Coisa', year: '2017', rating: '7.3', description: 'Um grupo de crianças enfrenta uma entidade que assume a forma de palhaço.' },
    { title: 'Um Lugar Silencioso', year: '2018', rating: '7.5', description: 'Uma família sobrevive em silêncio para evitar criaturas cegas.' },
    { title: 'A Bruxa', year: '2015', rating: '7.0', description: 'Uma família na Nova Inglaterra enfrenta forças sobrenaturais.' }
  ]
};

/**
 * Busca filme por título (case insensitive, busca parcial)
 * @param {string} query - Termo de busca
 * @returns {Array} - Array de filmes encontrados
 */
function searchMovies(query) {
  const results = [];
  const searchTerm = query.toLowerCase().trim();

  // Buscar em todas as categorias
  Object.values(MOVIES_DATA).forEach(category => {
    category.forEach(movie => {
      if (movie.title.toLowerCase().includes(searchTerm)) {
        results.push(movie);
      }
    });
  });

  // Remover duplicatas baseado no título
  const uniqueResults = results.filter((movie, index, self) =>
    index === self.findIndex((m) => m.title === movie.title)
  );

  return uniqueResults;
}

/**
 * Obtém informações de um filme específico
 * @param {string} title - Título do filme
 * @returns {Object|null} - Objeto do filme ou null
 */
function getMovieByTitle(title) {
  const results = searchMovies(title);
  return results.length > 0 ? results[0] : null;
}

/**
 * Lista todos os filmes disponíveis
 * @returns {Array} - Array com todos os filmes
 */
function getAllMovies() {
  const allMovies = [];
  Object.values(MOVIES_DATA).forEach(category => {
    allMovies.push(...category);
  });
  
  // Remover duplicatas
  const uniqueMovies = allMovies.filter((movie, index, self) =>
    index === self.findIndex((m) => m.title === movie.title)
  );
  
  return uniqueMovies;
}

/**
 * Obtém filmes por categoria
 * @param {string} category - Categoria (trending, topRated, suspense, comedy, action, horror)
 * @returns {Array} - Array de filmes da categoria
 */
function getMoviesByCategory(category) {
  return MOVIES_DATA[category] || [];
}

module.exports = {
  MOVIES_DATA,
  searchMovies,
  getMovieByTitle,
  getAllMovies,
  getMoviesByCategory
};
