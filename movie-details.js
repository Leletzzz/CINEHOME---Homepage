/**
 * Movie Details Page - Gestion des détails du film
 */

(function() {
    'use strict';

    // Base de données de films avec détails complets
    const MOVIES_DATABASE = {
        'Vingadores: Ultimato': {
            id: 299534,
            poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
            title: 'Vingadores: Ultimato',
            year: 2019,
            rating: 'PG-13',
            status: 'Released',
            duration: '3h 1m',
            genres: 'Ação, Aventura, Ficção Científica',
            tomatometer: 94,
            tomatometerCount: '542 Reviews',
            popcornmeter: 90,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Após Thanos eliminar metade das criaturas vivas, os Vingadores restantes devem fazer o que for necessário para desfazer as ações do Titã Louco e restaurar a ordem no universo.',
            director: 'Anthony Russo, Joe Russo',
            writer: 'Christopher Markus, Stephen McFeely',
            releaseDate: '25 de abril de 2019',
            budget: '$356,000,000',
            revenue: '$2,797,800,564',
            trailerVideoId: 'LMOqLeoP2yw'
        },
        'Homem-Aranha: Sem Volta Para Casa': {
            id: 634649,
            poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
            title: 'Homem-Aranha: Sem Volta Para Casa',
            year: 2021,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 28m',
            genres: 'Ação, Aventura, Ficção Científica',
            tomatometer: 93,
            tomatometerCount: '428 Reviews',
            popcornmeter: 98,
            popcornmeterCount: '250,000+ Ratings',
            synopsis: 'Peter Parker tem sua identidade secreta revelada e pede ajuda ao Doutor Estranho. Quando um feitiço para reverter o evento não sai como o esperado, o Homem-Aranha e seu companheiro dos Vingadores devem enfrentar inimigos de todas as realidades.',
            director: 'Jon Watts',
            writer: 'Chris McKenna, Erik Sommers',
            releaseDate: '16 de dezembro de 2021',
            budget: '$200,000,000',
            revenue: '$1,921,847,111',
            trailerVideoId: 'CyiiEJRZjSU'
        },
        'Oppenheimer': {
            id: 872585,
            poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/4GQfEI0n0V2lxh9H9n1tFoZT3zh.jpg',
            title: 'Oppenheimer',
            year: 2023,
            rating: 'R',
            status: 'Now Playing',
            duration: '3h 0m',
            genres: 'Drama, História, Thriller',
            tomatometer: 93,
            tomatometerCount: '452 Reviews',
            popcornmeter: 91,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'A épica história do físico J. Robert Oppenheimer e o desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
            director: 'Christopher Nolan',
            writer: 'Christopher Nolan',
            releaseDate: '20 de julho de 2023',
            budget: '$100,000,000',
            revenue: '$952,000,000',
            trailerVideoId: 'bK6ldnjE3Y0'
        },
        'Duna: Parte Dois': {
            id: 693134,
            poster: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/2QL5j6mB4ZpyBcVr0WO9H9MQGB8.jpg',
            title: 'Duna: Parte Dois',
            year: 2024,
            rating: 'PG-13',
            status: 'Now Playing',
            duration: '2h 46m',
            genres: 'Ficção Científica, Aventura',
            tomatometer: 92,
            tomatometerCount: '508 Reviews',
            popcornmeter: 95,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Paul Atreides se une aos Fremen em uma jornada de vingança e destino no deserto de Arrakis.',
            director: 'Denis Villeneuve',
            writer: 'Jon Spaihts, Denis Villeneuve',
            releaseDate: '1 de março de 2024',
            budget: '$190,000,000',
            revenue: '$711,844,000',
            trailerVideoId: 'U2Qp5pL3ovA'
        },
        'Parasita': {
            id: 496243,
            poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
            title: 'Parasita',
            year: 2019,
            rating: 'R',
            status: 'Released',
            duration: '2h 12m',
            genres: 'Comédia, Thriller, Drama',
            tomatometer: 98,
            tomatometerCount: '571 Reviews',
            popcornmeter: 93,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado. Uma obra de arte do acaso entra em suas vidas quando Ki-woo, o filho mais velho, recebe a indicação de um amigo rico para dar aula particular.',
            director: 'Bong Joon-ho',
            writer: 'Bong Joon-ho, Han Jin-won',
            releaseDate: '30 de maio de 2019',
            budget: '$11,400,000',
            revenue: '$258,841,363',
            trailerVideoId: 'isOGD_7hNIY'
        },
        'Avatar: O Caminho da Água': {
            id: 76600,
            poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
            title: 'Avatar: O Caminho da Água',
            year: 2022,
            rating: 'PG-13',
            status: 'Released',
            duration: '3h 12m',
            genres: 'Ficção Científica, Aventura, Ação',
            tomatometer: 76,
            tomatometerCount: '472 Reviews',
            popcornmeter: 92,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Jake Sully e Neytiri formaram uma família e estão fazendo de tudo para ficarem juntos. No entanto, eles devem sair de casa e explorar as regiões de Pandora.',
            director: 'James Cameron',
            writer: 'James Cameron, Rick Jaffa',
            releaseDate: '16 de dezembro de 2022',
            budget: '$350,000,000',
            revenue: '$2,320,250,281',
            trailerVideoId: 'a8Gx8wiNbs8'
        },
        'John Wick 4: Baba Yaga': {
            id: 603692,
            poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/iyD94zSdhSLI7mTMGRi1rOZMJdh.jpg',
            title: 'John Wick 4: Baba Yaga',
            year: 2023,
            rating: 'R',
            status: 'Released',
            duration: '2h 49m',
            genres: 'Ação, Thriller, Crime',
            tomatometer: 94,
            tomatometerCount: '412 Reviews',
            popcornmeter: 94,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes que ele possa conquistar sua liberdade, Wick deve enfrentar um novo inimigo com alianças poderosas em todo o mundo.',
            director: 'Chad Stahelski',
            writer: 'Shay Hatten, Michael Finch',
            releaseDate: '24 de março de 2023',
            budget: '$90,000,000',
            revenue: '$440,146,694',
            trailerVideoId: 'M7XM597XO94'
        },
        'Duna': {
            id: 438631,
            poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/xteMgrMugGuJ31MfN3ScZMp5XjE.jpg',
            title: 'Duna',
            year: 2021,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 35m',
            genres: 'Ficção Científica, Aventura',
            tomatometer: 83,
            tomatometerCount: '523 Reviews',
            popcornmeter: 90,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino, precisa viajar para o planeta mais perigoso do universo para garantir o futuro de sua família e de seu povo.',
            director: 'Denis Villeneuve',
            writer: 'Jon Spaihts, Denis Villeneuve, Eric Roth',
            releaseDate: '16 de setembro de 2021',
            budget: '$165,000,000',
            revenue: '$407,574,379',
            trailerVideoId: 'n9xhJrPXop4'
        },
        'Doutor Estranho no Multiverso da Loucura': {
            id: 453395,
            poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
            title: 'Doutor Estranho no Multiverso da Loucura',
            year: 2022,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 6m',
            genres: 'Fantasia, Ação, Aventura',
            tomatometer: 74,
            tomatometerCount: '520 Reviews',
            popcornmeter: 85,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Doutor Estranho, com a ajuda de aliados místicos, atravessa as realidades alternativas alucinantes e perigosas do Multiverso para enfrentar um novo adversário misterioso.',
            director: 'Sam Raimi',
            writer: 'Michael Waldron',
            releaseDate: '6 de maio de 2022',
            budget: '$200,000,000',
            revenue: '$955,775,804',
            trailerVideoId: 'X23XCFgdh2M'
        },
        'Pantera Negra': {
            id: 284054,
            poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg',
            title: 'Pantera Negra',
            year: 2018,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 14m',
            genres: 'Ação, Aventura, Ficção Científica',
            tomatometer: 96,
            tomatometerCount: '554 Reviews',
            popcornmeter: 79,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Após a morte do rei TChaka, o príncipe TChalla retorna a Wakanda para a cerimônia de coroação. Nela são reunidas as cinco tribos que compõem o reino, sendo que uma delas, os Jabari, não apoia o atual governo.',
            director: 'Ryan Coogler',
            writer: 'Ryan Coogler, Joe Robert Cole',
            releaseDate: '16 de fevereiro de 2018',
            budget: '$200,000,000',
            revenue: '$1,348,258,224',
            trailerVideoId: 'H6A6GvryOG8'
        },
        'Thor: Ragnarok': {
            id: 284053,
            poster: 'https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg',
            title: 'Thor: Ragnarok',
            year: 2017,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 10m',
            genres: 'Ação, Aventura, Fantasia',
            tomatometer: 93,
            tomatometerCount: '479 Reviews',
            popcornmeter: 87,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Thor está preso do outro lado do universo sem seu martelo e descobre que precisa vencer uma corrida contra o tempo para voltar a Asgard e parar o Ragnarok.',
            director: 'Taika Waititi',
            writer: 'Eric Pearson, Craig Kyle',
            releaseDate: '3 de novembro de 2017',
            budget: '$180,000,000',
            revenue: '$855,301,806',
            trailerVideoId: 'WWP_CjPk0Jw'
        },
        'Guardiões da Galáxia': {
            id: 118340,
            poster: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/bHarw8xrmQeqf3t8HpuMY7zoK4x.jpg',
            title: 'Guardiões da Galáxia',
            year: 2014,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 1m',
            genres: 'Ação, Ficção Científica, Aventura',
            tomatometer: 92,
            tomatometerCount: '334 Reviews',
            popcornmeter: 92,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Peter Quill é um aventureiro espacial que se torna alvo de caçadores de recompensas depois que rouba uma esfera cobiçada por um vilão perigoso.',
            director: 'James Gunn',
            writer: 'James Gunn, Nicole Perlman',
            releaseDate: '1 de agosto de 2014',
            budget: '$170,000,000',
            revenue: '$773,350,147',
            trailerVideoId: 'W8JYOj5K_7Y'
        },
        'Stranger Things': {
            id: 66732,
            poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
            title: 'Stranger Things',
            year: 2016,
            rating: 'TV-14',
            status: 'Returning Series',
            duration: '50m por episódio',
            genres: 'Ficção Científica, Drama, Mistério',
            tomatometer: 93,
            tomatometerCount: '112 Reviews',
            popcornmeter: 89,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Quando um menino desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos, forças sobrenaturais aterrorizantes e uma garota muito estranha.',
            director: 'Matt Duffer, Ross Duffer',
            writer: 'Matt Duffer, Ross Duffer',
            releaseDate: '15 de julho de 2016',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: 'KNaXLx1Il24'
        },
        'Breaking Bad': {
            id: 1396,
            poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
            title: 'Breaking Bad',
            year: 2008,
            rating: 'TV-MA',
            status: 'Ended',
            duration: '47m por episódio',
            genres: 'Drama, Crime, Thriller',
            tomatometer: 96,
            tomatometerCount: '78 Reviews',
            popcornmeter: 97,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um professor de química diagnosticado com câncer se une a um ex-aluno para fabricar e vender metanfetamina a fim de garantir o futuro de sua família.',
            director: 'Vince Gilligan',
            writer: 'Vince Gilligan',
            releaseDate: '20 de janeiro de 2008',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: 'XZ8daibM3AE'
        },
        'Shutter Island': {
            id: 11324,
            poster: 'https://www.themoviedb.org/t/p/original/9KQyjFHCHd560vtp7HIkn0fe6MG.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/4GWs8F41CMwlF19AHXKgfSr0zw4.jpg',
            title: 'Shutter Island',
            year: 2010,
            rating: 'R',
            status: 'Released',
            duration: '2h 18m',
            genres: 'Drama, Thriller, Mistério',
            tomatometer: 68,
            tomatometerCount: '283 Reviews',
            popcornmeter: 77,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um detetive investiga o desaparecimento de uma paciente em um hospital psiquiátrico em uma ilha remota.',
            director: 'Martin Scorsese',
            writer: 'Laeta Kalogridis',
            releaseDate: '19 de fevereiro de 2010',
            budget: '$80,000,000',
            revenue: '$294,804,195',
            trailerVideoId: 'v8yrZSkKxTA'
        },
        'Prisioneiros': {
            id: 146233,
            poster: 'https://uploads.spiritfanfiction.com/historias/capas/202106/prisioneiros-22512319-180620211557.jpg',
            backdrop: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/iGXrJvq3EVAd7CAt5BicepJYr5M.jpg',
            title: 'Prisioneiros',
            year: 2013,
            rating: 'R',
            status: 'Released',
            duration: '2h 33m',
            genres: 'Thriller, Crime, Drama',
            tomatometer: 81,
            tomatometerCount: '289 Reviews',
            popcornmeter: 87,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um pai desesperado busca sua filha desaparecida e toma medidas drásticas quando a polícia não consegue resultados.',
            director: 'Denis Villeneuve',
            writer: 'Aaron Guzikowski',
            releaseDate: '20 de setembro de 2013',
            budget: '$46,000,000',
            revenue: '$122,127,446',
            trailerVideoId: '5cediRGsd2c'
        },
        'Corra!': {
            id: 419430,
            poster: 'https://image.tmdb.org/t/p/w500/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/72V1r1G8S87VladowP7T1f4SIKS.jpg',
            title: 'Corra!',
            year: 2017,
            rating: 'R',
            status: 'Released',
            duration: '1h 44m',
            genres: 'Horror, Thriller, Mistério',
            tomatometer: 98,
            tomatometerCount: '405 Reviews',
            popcornmeter: 86,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um jovem afro-americano descobre um terrível segredo durante uma visita aos pais de sua namorada branca.',
            director: 'Jordan Peele',
            writer: 'Jordan Peele',
            releaseDate: '25 de fevereiro de 2017',
            budget: '$4,500,000',
            revenue: '$255,407,969',
            trailerVideoId: 'szmE6Waer9k'
        },
        'Deadpool': {
            id: 293660,
            poster: 'https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/n1y094tVDFATSzkTnFxoGZ1qNsG.jpg',
            title: 'Deadpool',
            year: 2016,
            rating: 'R',
            status: 'Released',
            duration: '1h 48m',
            genres: 'Ação, Aventura, Comédia',
            tomatometer: 85,
            tomatometerCount: '342 Reviews',
            popcornmeter: 90,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um mercenário com poderes de cura rápida adota a alter ego Deadpool e busca vingança contra o homem que destruiu sua vida.',
            director: 'Tim Miller',
            writer: 'Rhett Reese, Paul Wernick',
            releaseDate: '12 de fevereiro de 2016',
            budget: '$58,000,000',
            revenue: '$782,612,155',
            trailerVideoId: 'FyKWUTwSYAs'
        },
        'Top Gun: Maverick': {
            id: 361743,
            poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
            title: 'Top Gun: Maverick',
            year: 2022,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 10m',
            genres: 'Ação, Drama',
            tomatometer: 96,
            tomatometerCount: '523 Reviews',
            popcornmeter: 99,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Após mais de 30 anos de serviço, Pete "Maverick" Mitchell continua como um dos melhores pilotos de caça da Marinha, treinando a próxima geração de aviadores.',
            director: 'Joseph Kosinski',
            writer: 'Ehren Kruger, Eric Warren Singer',
            releaseDate: '27 de maio de 2022',
            budget: '$170,000,000',
            revenue: '$1,495,696,292',
            trailerVideoId: '7aOCYTflp8o'
        },
        'Mad Max: Estrada da Fúria': {
            id: 76341,
            poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/tbhdm8UJAb4ViCTsulYFL3lECg.jpg',
            title: 'Mad Max: Estrada da Fúria',
            year: 2015,
            rating: 'R',
            status: 'Released',
            duration: '2h 0m',
            genres: 'Ação, Aventura, Ficção Científica',
            tomatometer: 97,
            tomatometerCount: '463 Reviews',
            popcornmeter: 86,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Em um deserto pós-apocalíptico, Max se junta a Furiosa em uma fuga desesperada de um senhor da guerra.',
            director: 'George Miller',
            writer: 'George Miller, Brendan McCarthy',
            releaseDate: '15 de maio de 2015',
            budget: '$150,000,000',
            revenue: '$378,858,340',
            trailerVideoId: 'hEJnMQG9ev8'
        },
        'Batman: O Cavaleiro das Trevas': {
            id: 155,
            poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
            title: 'Batman: O Cavaleiro das Trevas',
            year: 2008,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 32m',
            genres: 'Drama, Ação, Crime',
            tomatometer: 94,
            tomatometerCount: '345 Reviews',
            popcornmeter: 94,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Batman enfrenta o caos causado pelo Coringa, um criminoso psicopata que quer provar que até o melhor dos homens pode se corromper.',
            director: 'Christopher Nolan',
            writer: 'Jonathan Nolan, Christopher Nolan',
            releaseDate: '18 de julho de 2008',
            budget: '$185,000,000',
            revenue: '$1,004,558,444',
            trailerVideoId: 'EXeTwQWrcwY'
        },
        'Matrix': {
            id: 603,
            poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/icmmSD4vTTDKOq2vvdulafOGw93.jpg',
            title: 'Matrix',
            year: 1999,
            rating: 'R',
            status: 'Released',
            duration: '2h 16m',
            genres: 'Ação, Ficção Científica',
            tomatometer: 83,
            tomatometerCount: '178 Reviews',
            popcornmeter: 85,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um hacker descobre que a realidade como ele conhece é uma simulação criada por máquinas inteligentes.',
            director: 'Lana Wachowski, Lilly Wachowski',
            writer: 'Lana Wachowski, Lilly Wachowski',
            releaseDate: '31 de março de 1999',
            budget: '$63,000,000',
            revenue: '$467,222,728',
            trailerVideoId: 'OM0tSTEfdyQ'
        },
        'A Origem': {
            id: 27205,
            poster: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mlgUWds7UXHFQx4bealSnn4Ib7A.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
            title: 'A Origem',
            year: 2010,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 28m',
            genres: 'Ação, Ficção Científica, Aventura',
            tomatometer: 87,
            tomatometerCount: '365 Reviews',
            popcornmeter: 91,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um ladrão que invade os sonhos das pessoas recebe a chance de ter seu passado criminoso apagado se conseguir implantar uma ideia na mente de alguém.',
            director: 'Christopher Nolan',
            writer: 'Christopher Nolan',
            releaseDate: '16 de julho de 2010',
            budget: '$160,000,000',
            revenue: '$836,848,102',
            trailerVideoId: 'YoHD9XEInc0'
        },
        'Interestelar': {
            id: 157336,
            poster: 'https://image.tmdb.org/t/p/w500/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
            title: 'Interestelar',
            year: 2014,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 49m',
            genres: 'Aventura, Drama, Ficção Científica',
            tomatometer: 73,
            tomatometerCount: '375 Reviews',
            popcornmeter: 86,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Com o fim da Terra se aproximando, um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.',
            director: 'Christopher Nolan',
            writer: 'Jonathan Nolan, Christopher Nolan',
            releaseDate: '7 de novembro de 2014',
            budget: '$165,000,000',
            revenue: '$701,729,206',
            trailerVideoId: 'zSWdZVtXT7E'
        },
        'Um Sonho de Liberdade': {
            id: 278,
            poster: 'https://image.tmdb.org/t/p/w500/6GZBRtAhzkSQcKfkZqmrG3cdfRQ.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
            title: 'Um Sonho de Liberdade',
            year: 1994,
            rating: 'R',
            status: 'Released',
            duration: '2h 22m',
            genres: 'Drama, Crime',
            tomatometer: 89,
            tomatometerCount: '89 Reviews',
            popcornmeter: 98,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Dois homens presos formam uma amizade ao longo dos anos, encontrando consolo e eventual redenção através de atos de decência comum.',
            director: 'Frank Darabont',
            writer: 'Frank Darabont, Stephen King',
            releaseDate: '23 de setembro de 1994',
            budget: '$25,000,000',
            revenue: '$28,341,469',
            trailerVideoId: '6hB3S9bIaco'
        },
        'O Poderoso Chefão': {
            id: 238,
            poster: 'https://image.tmdb.org/t/p/w500/u8LAG1JI57U9p0s8TyEEeoykR5d.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
            title: 'O Poderoso Chefão',
            year: 1972,
            rating: 'R',
            status: 'Released',
            duration: '2h 55m',
            genres: 'Drama, Crime',
            tomatometer: 97,
            tomatometerCount: '145 Reviews',
            popcornmeter: 98,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
            director: 'Francis Ford Coppola',
            writer: 'Mario Puzo, Francis Ford Coppola',
            releaseDate: '24 de março de 1972',
            budget: '$6,000,000',
            revenue: '$250,341,816',
            trailerVideoId: 'sY1S34973zA'
        },
        'A Meia-Irmã Feia': {
            id: 1287067,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lgO9ZdNe2ikRmQbLYnSHPxgunyP.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/lgO9ZdNe2ikRmQbLYnSHPxgunyP.jpg',
            title: 'A Meia-Irmã Feia',
            year: 2025,
            rating: 'PG-13',
            status: 'Now Playing',
            duration: '1h 52m',
            genres: 'Comédia, Romance, Drama',
            tomatometer: 75,
            tomatometerCount: '89 Reviews',
            popcornmeter: 82,
            popcornmeterCount: '50,000+ Ratings',
            synopsis: 'Uma comédia romântica sobre família, amor e segundas chances. Quando uma jovem descobre que tem uma meia-irmã, suas vidas se entrelaçam de maneiras inesperadas.',
            director: 'Diretor Desconhecido',
            writer: 'Roteirista Desconhecido',
            releaseDate: '2025',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        },
        'Doutor Estranho 2': {
            id: 453395,
            poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
            title: 'Doutor Estranho no Multiverso da Loucura',
            year: 2022,
            rating: 'PG-13',
            status: 'Released',
            duration: '2h 6m',
            genres: 'Fantasia, Ação, Aventura',
            tomatometer: 74,
            tomatometerCount: '520 Reviews',
            popcornmeter: 85,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Doutor Estranho, com a ajuda de aliados místicos, atravessa as realidades alternativas alucinantes e perigosas do Multiverso para enfrentar um novo adversário misterioso.',
            director: 'Sam Raimi',
            writer: 'Michael Waldron',
            releaseDate: '6 de maio de 2022',
            budget: '$200,000,000',
            revenue: '$955,775,804',
            trailerVideoId: 'X23XCFgdh2M'
        },
        'O Senhor dos Anéis: O Retorno do Rei': {
            id: 122,
            poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg',
            title: 'O Senhor dos Anéis: O Retorno do Rei',
            year: 2003,
            rating: 'PG-13',
            status: 'Released',
            duration: '3h 21m',
            genres: 'Aventura, Fantasia, Ação',
            tomatometer: 93,
            tomatometerCount: '275 Reviews',
            popcornmeter: 86,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Aragorn lidera as forças do bem contra o exército de Sauron enquanto Frodo se aproxima de Mordor para destruir o Um Anel.',
            director: 'Peter Jackson',
            writer: 'Fran Walsh, Philippa Boyens, Peter Jackson',
            releaseDate: '17 de dezembro de 2003',
            budget: '$94,000,000',
            revenue: '$1,146,030,912',
            trailerVideoId: 'r5X-hFf6Bwo'
        },
        'Pulp Fiction: Tempo de Violência': {
            id: 680,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/tptjnB2LDbuUWya9Cx5sQtv5hqb.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg',
            title: 'Pulp Fiction: Tempo de Violência',
            year: 1994,
            rating: 'R',
            status: 'Released',
            duration: '2h 34m',
            genres: 'Thriller, Crime',
            tomatometer: 92,
            tomatometerCount: '182 Reviews',
            popcornmeter: 96,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Histórias interligadas de crime e redenção no submundo de Los Angeles.',
            director: 'Quentin Tarantino',
            writer: 'Quentin Tarantino, Roger Avary',
            releaseDate: '14 de outubro de 1994',
            budget: '$8,000,000',
            revenue: '$213,928,762',
            trailerVideoId: 's7EdQ4FqbhY'
        },
        'A Viagem de Chihiro': {
            id: 129,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hhoKhsyJ3hFaxEm5pMdZRiTu2lJ.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg',
            title: 'A Viagem de Chihiro',
            year: 2003,
            rating: 'PG',
            status: 'Released',
            duration: '2h 5m',
            genres: 'Animação, Família, Fantasia',
            tomatometer: 97,
            tomatometerCount: '245 Reviews',
            popcornmeter: 96,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Uma menina de 10 anos entra em um mundo mágico de deuses e bruxas, e deve trabalhar em uma casa de banhos para salvar seus pais.',
            director: 'Hayao Miyazaki',
            writer: 'Hayao Miyazaki',
            releaseDate: '20 de julho de 2003',
            budget: '$19,000,000',
            revenue: '$365,481,131',
            trailerVideoId: 'ByXuk9QqQkk'
        },
        '12 Homens e uma Sentença': {
            id: 389,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/aiHIhV8c45FzIlbqYlswrrNyQD6.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/qqHQsStV6exghCM7zbObuYBiYxw.jpg',
            title: '12 Homens e uma Sentença',
            year: 1957,
            rating: 'Approved',
            status: 'Released',
            duration: '1h 36m',
            genres: 'Drama',
            tomatometer: 100,
            tomatometerCount: '58 Reviews',
            popcornmeter: 97,
            popcornmeterCount: '500,000+ Ratings',
            synopsis: 'Um júri de doze homens debate o destino de um jovem acusado de assassinato em primeiro grau.',
            director: 'Sidney Lumet',
            writer: 'Reginald Rose',
            releaseDate: '10 de abril de 1957',
            budget: '$350,000',
            revenue: '$2,000,000',
            trailerVideoId: 'T8V0-0hRkE8'
        },
        'Avatar 3': {
            id: 83533,
            poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
            title: 'Avatar 3',
            year: 2025,
            rating: 'PG-13',
            status: 'Coming Soon',
            duration: 'N/A',
            genres: 'Ficção Científica, Aventura, Ação',
            tomatometer: 0,
            tomatometerCount: '0 Reviews',
            popcornmeter: 0,
            popcornmeterCount: '0 Ratings',
            synopsis: 'A continuação da saga épica de Jake Sully e Neytiri em Pandora.',
            director: 'James Cameron',
            writer: 'James Cameron',
            releaseDate: '2025',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        },
        'Predador: Terras Selvagens': {
            id: 1279183,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/jg6lHhCMm8FE3DlZK9KgKyRUIgp.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/jg6lHhCMm8FE3DlZK9KgKyRUIgp.jpg',
            title: 'Predador: Terras Selvagens',
            year: 2024,
            rating: 'R',
            status: 'Coming Soon',
            duration: 'N/A',
            genres: 'Ação, Ficção Científica, Thriller',
            tomatometer: 0,
            tomatometerCount: '0 Reviews',
            popcornmeter: 0,
            popcornmeterCount: '0 Ratings',
            synopsis: 'A próxima aventura da franquia Predador em terras selvagens inexploradas.',
            director: 'Dan Trachtenberg',
            writer: 'Patrick Aison',
            releaseDate: '2024',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        },
        'TRON: Ares': {
            id: 592834,
            poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lyq8uQzxWTCIxWEKuxyQPrbVu40.jpg',
            backdrop: 'https://image.tmdb.org/t/p/original/lyq8uQzxWTCIxWEKuxyQPrbVu40.jpg',
            title: 'TRON: Ares',
            year: 2025,
            rating: 'PG-13',
            status: 'Coming Soon',
            duration: 'N/A',
            genres: 'Ficção Científica, Ação, Aventura',
            tomatometer: 0,
            tomatometerCount: '0 Reviews',
            popcornmeter: 0,
            popcornmeterCount: '0 Ratings',
            synopsis: 'Um programa altamente sofisticado, Ares, é enviado do mundo digital ao mundo real em uma missão perigosa.',
            director: 'Joachim Rønning',
            writer: 'Jesse Wigutow, Jack Thorne',
            releaseDate: '2025',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        },
        'Uma Batalha Após A Outra': {
            id: 999999,
            poster: 'https://mistv.com.br/wp-content/uploads/2025/09/Banner-Site-Uma-Batalha-Apos-a-Outra.jpg',
            backdrop: 'https://mistv.com.br/wp-content/uploads/2025/09/Banner-Site-Uma-Batalha-Apos-a-Outra.jpg',
            title: 'Uma Batalha Após A Outra',
            year: 2025,
            rating: 'R',
            status: 'Now Playing',
            duration: '2h 15m',
            genres: 'Ação, Drama, Thriller',
            tomatometer: 78,
            tomatometerCount: '124 Reviews',
            popcornmeter: 85,
            popcornmeterCount: '100,000+ Ratings',
            synopsis: 'Quando seu antigo inimigo ressurge após 16 anos, um grupo de ex-revolucionários se reúne para resgatar a filha de um dos seus membros.',
            director: 'Diretor Desconhecido',
            writer: 'Roteirista Desconhecido',
            releaseDate: '2025',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        },
        'Caramelo': {
            id: 888888,
            poster: 'https://burnbook.com.br/wp-content/uploads/2025/08/PT-BR_CARAMELO_Main-Key-Art_Dupla_Vertical_4x5_sRGB_PRE-1.jpg',
            backdrop: 'https://burnbook.com.br/wp-content/uploads/2025/08/PT-BR_CARAMELO_Main-Key-Art_Dupla_Vertical_4x5_sRGB_PRE-1.jpg',
            title: 'Caramelo',
            year: 2025,
            rating: 'PG',
            status: 'Now Playing',
            duration: '1h 45m',
            genres: 'Drama, Família',
            tomatometer: 82,
            tomatometerCount: '156 Reviews',
            popcornmeter: 91,
            popcornmeterCount: '200,000+ Ratings',
            synopsis: 'Pedro é um obstinado chef de cozinha que está prestes a realizar seu sonho quando um diagnóstico inesperado revira sua vida. Com a ajuda de um simpático vira-lata caramelo, ele embarca em uma jornada de redescoberta.',
            director: 'Diego Freitas',
            writer: 'Diego Freitas',
            releaseDate: '2025',
            budget: 'N/A',
            revenue: 'N/A',
            trailerVideoId: ''
        }
    };

    // Film par défaut
    const DEFAULT_MOVIE = {
        poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/4GQfEI0n0V2lxh9H9n1tFoZT3zh.jpg',
        title: 'Film Indisponível',
        year: 2024,
        rating: 'N/A',
        status: 'N/A',
        duration: 'N/A',
        genres: 'N/A',
        tomatometer: 0,
        tomatometerCount: '0 Reviews',
        popcornmeter: 0,
        popcornmeterCount: '0 Ratings',
        synopsis: 'Informações não disponíveis no momento.',
        director: 'N/A',
        writer: 'N/A',
        releaseDate: 'N/A',
        budget: 'N/A',
        revenue: 'N/A',
        trailerVideoId: ''
    };

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        loadMovieDetails();
        setupTrailerButton();
    });

    /**
     * Charge les détails du film
     */
    async function loadMovieDetails() {
        // Récupérer le titre et l'ID du film depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const movieTitle = urlParams.get('title');
        const movieId = urlParams.get('id');
        const mediaType = urlParams.get('type');
        const source = urlParams.get('source'); // Vérifier si c'est un résultat TMDB
        
        console.log('🔍 PARAMÈTRES URL DÉTECTÉS:');
        console.log('  - movieId:', movieId);
        console.log('  - movieTitle:', movieTitle);
        console.log('  - mediaType:', mediaType);
        console.log('  - source:', source);
        console.log('  - URL complète:', window.location.href);
        
        if (!movieTitle && !movieId) {
            console.warn('❌ Aucun titre ou ID de film spécifié');
            showError();
            return;
        }

        console.log('🎬 Chargement des détails:', { movieId, movieTitle, mediaType, source });

        // Tenter de charger depuis TMDB directement si un ID est fourni
        if (movieId) {
            try {
                console.log('🔄 Chargement depuis TMDB API (frontend direct)...');
                const tmdbMovie = await fetchMovieFromTMDBDirect(movieId);
                
                if (tmdbMovie) {
                    console.log('✅ Détails TMDB chargés avec succès:', tmdbMovie);
                    console.log('📌 Vérification des données reçues:');
                    console.log('  - ID reçu:', tmdbMovie.id);
                    console.log('  - Titre reçu:', tmdbMovie.title);
                    console.log('  - Année reçue:', tmdbMovie.year);
                    console.log('  - Type de média:', tmdbMovie.mediaType);
                    
                    // VÉRIFICATION CRITIQUE: Est-ce que l'ID correspond?
                    if (tmdbMovie.id && movieId && tmdbMovie.id.toString() !== movieId.toString()) {
                        console.error('⚠️⚠️⚠️ ATTENTION: ID NE CORRESPOND PAS!');
                        console.error('  - ID demandé:', movieId);
                        console.error('  - ID reçu:', tmdbMovie.id);
                        console.error('  - Possible confusion de données!');
                    }
                    
                    updateMovieInfo(tmdbMovie);
                    return;
                } else {
                    console.warn('⚠️ fetchMovieFromTMDBDirect retornou null');
                }
            } catch (error) {
                console.error('⚠️ Erreur lors du chargement TMDB:', error);
                console.error('Stack trace:', error.stack);
            }
        } else {
            console.log('ℹ️ Nenhum ID de filme fornecido, usando fallback');
        }

        // Fallback vers la base de données locale
        console.log('📂 Utilisation de la base de données locale');
        const movie = MOVIES_DATABASE[movieTitle] || DEFAULT_MOVIE;
        
        // Mettre à jour les éléments de la page
        updateMovieInfo(movie);
    }

    /**
     * Récupère les détails d'un film ou série depuis TMDB directement (frontend)
     */
    async function fetchMovieFromTMDBDirect(movieId) {
        console.log('🎯 === fetchMovieFromTMDBDirect APPELÉ ===');
        console.log('  📥 ID reçu:', movieId);
        console.log('  📥 Type de movieId:', typeof movieId);
        
        try {
            // Vérifier si une clé API TMDB est disponible
            const apiKey = localStorage.getItem('tmdb_api_key');
            console.log('🔑 Vérification clé API TMDB:', apiKey ? `Trouvée (${apiKey.length} chars)` : 'NON TROUVÉE');
            
            if (!apiKey) {
                console.error('❌ ERREUR: Pas de clé API TMDB dans localStorage!');
                console.log('💡 SOLUTION: Cliquez sur "Configurar TMDB" et insira sua chave API');
                return null;
            }

            // Vérifier les paramètres URL pour détecter le type (movie ou tv)
            const urlParams = new URLSearchParams(window.location.search);
            const mediaType = urlParams.get('type') || 'movie'; // Par défaut: movie
            
            // Construire l'URL selon le type de média
            const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
            const url = `https://api.themoviedb.org/3/${endpoint}/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,videos,similar`;
            
            console.log(`📡 URL da requisição TMDB:`, url.replace(apiKey, 'API_KEY_HIDDEN'));
            console.log(`🎬 Buscando detalhes do ${mediaType} ID: ${movieId}`);
            
            // Appeler l'API TMDB directement
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(`📊 Status da resposta TMDB: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                console.error(`❌ Erreur TMDB API: ${response.status} ${response.statusText}`);
                const errorText = await response.text();
                console.error('📄 Resposta de erro:', errorText);
                
                // Si échec avec le type par défaut, essayer l'autre type
                if (mediaType === 'movie') {
                    console.log('🔄 Tentativa com tipo "tv" ao invés de "movie"...');
                    const tvUrl = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,videos,similar`;
                    console.log(`📡 Tentando com endpoint TV:`, tvUrl.replace(apiKey, 'API_KEY_HIDDEN'));
                    
                    const tvResponse = await fetch(tvUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    console.log(`📊 Status da resposta TV: ${tvResponse.status} ${tvResponse.statusText}`);
                    
                    if (tvResponse.ok) {
                        const tvData = await tvResponse.json();
                        console.log('✅✅✅ Sucesso com endpoint "tv"!', tvData);
                        return formatTMDBMedia(tvData, 'tv');
                    } else {
                        const tvErrorText = await tvResponse.text();
                        console.error('❌ Erro também com endpoint TV:', tvErrorText);
                    }
                } else if (mediaType === 'tv') {
                    // Tentativa reversa: se falhou com TV, tenta com movie
                    console.log('🔄 Tentativa com tipo "movie" ao invés de "tv"...');
                    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,videos,similar`;
                    console.log(`📡 Tentando com endpoint Movie:`, movieUrl.replace(apiKey, 'API_KEY_HIDDEN'));
                    
                    const movieResponse = await fetch(movieUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    console.log(`📊 Status da resposta Movie: ${movieResponse.status} ${movieResponse.statusText}`);
                    
                    if (movieResponse.ok) {
                        const movieData = await movieResponse.json();
                        console.log('✅✅✅ Sucesso com endpoint "movie"!', movieData);
                        return formatTMDBMedia(movieData, 'movie');
                    } else {
                        const movieErrorText = await movieResponse.text();
                        console.error('❌ Erro também com endpoint Movie:', movieErrorText);
                    }
                }
                
                throw new Error(`Erreur TMDB: ${response.status}`);
            }

            const data = await response.json();
            
            console.log('✅✅✅ Dados COMPLETOS recebidos de TMDB:', data);
            console.log('📌 Título:', data.title || data.name);
            console.log('📌 Ano:', data.release_date || data.first_air_date);
            console.log('📌 Avaliação:', data.vote_average);
            console.log('📌 Duração:', data.runtime || data.episode_run_time, 'minutos');
            console.log('📌 Tem créditos?', !!data.credits);
            console.log('📌 Tem vídeos?', !!data.videos);
            
            // Formater les données TMDB (supporte films et séries)
            const formattedMovie = formatTMDBMedia(data, mediaType);
            console.log('🎨 Mídia FORMATADA para exibição:', formattedMovie);
            
            return formattedMovie;
        } catch (error) {
            console.error('❌ Erreur lors de la récupération depuis TMDB:', error);
            return null;
        }
    }

    /**
     * Formate les données du backend au format de l'application
     */
    function formatBackendMovie(movie) {
        // Les données du backend sont déjà formatées, mais on doit s'assurer
        // qu'elles correspondent au format attendu par updateMovieInfo
        
        return {
            id: movie.id || 0,
            poster: movie.posterUrl || movie.poster || '',
            backdrop: movie.backdropUrl || movie.backdrop || '',
            title: movie.titulo || movie.title || 'Título não disponível',
            year: movie.ano || movie.year || 'N/A',
            rating: movie.certificacao || 'PG-13',
            status: movie.status || 'Released',
            duration: movie.duracao || movie.duration || 'N/A',
            genres: movie.generos || movie.genres || 'N/A',
            tomatometer: parseFloat(movie.avaliacao) ? Math.round(parseFloat(movie.avaliacao) * 10) : 0,
            tomatometerCount: movie.numeroVotos ? `${movie.numeroVotos} Reviews` : 'N/A',
            popcornmeter: parseFloat(movie.avaliacao) ? Math.round(parseFloat(movie.avaliacao) * 10) : 0,
            popcornmeterCount: movie.numeroVotos ? `${movie.numeroVotos} Ratings` : 'N/A',
            synopsis: movie.sinopse || movie.synopsis || 'Sinopse não disponível',
            director: movie.diretor || movie.director || 'N/A',
            writer: movie.roteirista || movie.writer || 'N/A',
            releaseDate: movie.dataLancamento || movie.releaseDate || 'N/A',
            budget: movie.orcamento || movie.budget || 'N/A',
            revenue: movie.receita || movie.revenue || 'N/A',
            trailerVideoId: movie.trailerYoutubeId || movie.trailerVideoId || null
        };
    }

    /**
     * Formate les données TMDB au format de l'application (supporte films et séries TV)
     */
    function formatTMDBMedia(data, mediaType = 'movie') {
        console.log('🎨 formatTMDBMedia appelé avec:');
        console.log('  - mediaType:', mediaType);
        console.log('  - data.id:', data.id);
        console.log('  - data.title:', data.title);
        console.log('  - data.name:', data.name);
        console.log('  - data.original_title:', data.original_title);
        console.log('  - data.original_name:', data.original_name);
        
        // Extraire la bande-annonce YouTube
        const trailerVideo = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        
        // Extraire le réalisateur (films) ou créateur (séries)
        let director = 'N/A';
        if (mediaType === 'tv') {
            director = data.created_by?.map(c => c.name).join(', ') || 'N/A';
        } else {
            director = data.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A';
        }
        
        // Extraire les scénaristes
        const writers = data.credits?.crew?.filter(c => c.job === 'Writer' || c.job === 'Screenplay')
            .map(w => w.name)
            .slice(0, 2)
            .join(', ') || 'N/A';
        
        // Formater la durée
        let duration = 'N/A';
        if (mediaType === 'tv') {
            // Pour les séries: utiliser episode_run_time ou number_of_episodes
            const episodeRuntime = data.episode_run_time?.[0];
            if (episodeRuntime) {
                duration = `${episodeRuntime}m por episódio`;
            } else if (data.number_of_episodes) {
                duration = `${data.number_of_episodes} episódios`;
            }
        } else {
            // Pour les films: utiliser runtime
            duration = data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : 'N/A';
        }
        
        // Formater le budget et revenue (uniquement pour les films)
        const formatCurrency = (amount) => {
            if (!amount || amount === 0) return 'N/A';
            return '$' + amount.toLocaleString('en-US');
        };

        // Titre et date selon le type de média
        const title = mediaType === 'tv' 
            ? (data.name || data.original_name) 
            : (data.title || data.original_title);
            
        const releaseDate = mediaType === 'tv' 
            ? data.first_air_date 
            : data.release_date;
            
        const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';

        // Status adapté au type
        let status = 'Released';
        if (mediaType === 'tv') {
            status = data.status === 'Returning Series' ? 'Returning Series' : 
                     data.status === 'Ended' ? 'Ended' : 
                     data.in_production ? 'In Production' : 'Released';
        } else {
            status = data.status === 'Released' ? 'Released' : 'Now Playing';
        }

        return {
            id: data.id,
            poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
            backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
            title: title || 'Título não disponível',
            year: year,
            rating: mediaType === 'tv' ? 'TV-14' : 'PG-13', // TMDB não fornece rating, usar padrão
            status: status,
            duration: duration,
            genres: data.genres?.map(g => g.name).join(', ') || 'N/A',
            tomatometer: Math.round(data.vote_average * 10) || 0,
            tomatometerCount: `${data.vote_count || 0} Reviews`,
            popcornmeter: Math.round(data.vote_average * 10) || 0,
            popcornmeterCount: `${data.vote_count || 0} Ratings`,
            synopsis: data.overview || 'Sinopse não disponível',
            director: director,
            writer: writers,
            releaseDate: releaseDate ? new Date(releaseDate).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) : 'N/A',
            budget: mediaType === 'movie' ? formatCurrency(data.budget) : 'N/A',
            revenue: mediaType === 'movie' ? formatCurrency(data.revenue) : 'N/A',
            trailerVideoId: trailerVideo?.key || '',
            mediaType: mediaType // Stocker le type pour référence future
        };
    }
    
    /**
     * Alias pour compatibilité avec le code existant
     */
    function formatTMDBMovie(data) {
        return formatTMDBMedia(data, 'movie');
    }

    /**
     * Met à jour les informations du film
     */
    function updateMovieInfo(movie) {
        console.log('🎨 updateMovieInfo chamada com:', movie);
        
        // Helper function para atualizar elementos com segurança
        const setElementContent = (id, content, isImage = false) => {
            const element = document.getElementById(id);
            if (element) {
                if (isImage) {
                    element.src = content;
                } else {
                    element.textContent = content;
                }
            } else {
                console.warn(`⚠️ Elemento não encontrado: ${id}`);
            }
        };
        
        // Hero section
        setElementContent('movie-backdrop', movie.backdrop, true);
        setElementContent('movie-poster', movie.poster, true);
        setElementContent('movie-title', movie.title);
        setElementContent('movie-rating-badge', movie.rating);
        setElementContent('movie-status', movie.status);
        setElementContent('movie-duration', movie.duration);
        setElementContent('movie-genres', movie.genres);

        // Ratings - Convertir tomatometer en note sur 10 et afficher les étoiles
        const ratingValue = movie.tomatometer ? (movie.tomatometer / 10).toFixed(1) : '0.0';
        const ratingCount = movie.tomatometerCount || '0 avaliações';
        
        // Mettre à jour le texte de notation
        setElementContent('rating-score-text', `${ratingValue}/10`);
        setElementContent('rating-count', `Baseado em ${ratingCount}`);
        
        // Afficher les étoiles remplies selon la note
        updateStarRating(parseFloat(ratingValue));
        
        // Charger les plateformes de streaming depuis TMDB
        if (movie.id) {
            loadStreamingProviders(movie.id);
        }

        // Synopsis
        setElementContent('synopsis-text', movie.synopsis);

        // What to Know - Elementos opcionais (podem não existir no HTML)
        setElementContent('movie-title-info', movie.title);
        setElementContent('movie-title-em', movie.title);
        setElementContent('movie-director', movie.director);
        setElementContent('movie-writer', movie.writer);
        setElementContent('movie-release-date', movie.releaseDate);
        setElementContent('movie-budget', movie.budget);
        setElementContent('movie-revenue', movie.revenue);

        // Stocker l'ID de la vidéo pour le trailer
        if (movie.trailerVideoId) {
            const trailerBtn = document.getElementById('play-trailer-btn');
            if (trailerBtn) {
                trailerBtn.dataset.videoId = movie.trailerVideoId;
            }
        }
        
        console.log('✅ Informações do filme atualizadas com sucesso!');
    }

    /**
     * Met à jour l'affichage des étoiles
     */
    function updateStarRating(rating) {
        const stars = document.querySelectorAll('.star');
        const fullStars = Math.floor(rating / 2); // Convertir note sur 10 en étoiles sur 5
        const hasHalfStar = (rating / 2) % 1 >= 0.5;
        
        stars.forEach((star, index) => {
            if (index < fullStars) {
                // Étoile pleine
                star.setAttribute('fill', '#FFD700');
                star.style.opacity = '1';
            } else if (index === fullStars && hasHalfStar) {
                // Demi-étoile
                star.setAttribute('fill', 'url(#half-star-gradient)');
                star.style.opacity = '1';
                
                // Créer un gradient pour la demi-étoile si nécessaire
                if (!document.getElementById('half-star-gradient')) {
                    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    gradient.setAttribute('id', 'half-star-gradient');
                    
                    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop1.setAttribute('offset', '50%');
                    stop1.setAttribute('stop-color', '#FFD700');
                    
                    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop2.setAttribute('offset', '50%');
                    stop2.setAttribute('stop-color', '#555');
                    
                    gradient.appendChild(stop1);
                    gradient.appendChild(stop2);
                    defs.appendChild(gradient);
                    star.insertBefore(defs, star.firstChild);
                }
            } else {
                // Étoile vide
                star.setAttribute('fill', '#555');
                star.style.opacity = '0.3';
            }
        });
    }

    /**
     * Charge les plateformes de streaming depuis TMDB (supporte films et séries)
     */
    async function loadStreamingProviders(movieId) {
        try {
            const apiKey = localStorage.getItem('tmdb_api_key');
            if (!apiKey) {
                console.log('Pas de clé API TMDB configurée');
                setDefaultStreamingProviders();
                return;
            }

            // Vérifier le type de média depuis les paramètres URL
            const urlParams = new URLSearchParams(window.location.search);
            const mediaType = urlParams.get('type') || 'movie';
            const endpoint = mediaType === 'tv' ? 'tv' : 'movie';

            const response = await fetch(`https://api.themoviedb.org/3/${endpoint}/${movieId}/watch/providers?api_key=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`Erreur TMDB: ${response.status}`);
            }

            const data = await response.json();
            
            // Chercher les providers pour le Brésil (BR) ou US comme fallback
            const providers = data.results?.BR?.flatrate || data.results?.US?.flatrate || [];
            
            if (providers.length > 0) {
                displayStreamingProviders(providers);
            } else {
                setDefaultStreamingProviders();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des providers:', error);
            setDefaultStreamingProviders();
        }
    }

    /**
     * Affiche les plateformes de streaming
     */
    function displayStreamingProviders(providers) {
        const container = document.getElementById('streaming-logos');
        container.innerHTML = '';
        
        // Limiter à 4 providers maximum
        providers.slice(0, 4).forEach(provider => {
            const item = document.createElement('div');
            item.className = 'streaming-item';
            
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/original${provider.logo_path}`;
            img.alt = provider.provider_name;
            
            const span = document.createElement('span');
            span.textContent = provider.provider_name;
            
            item.appendChild(img);
            item.appendChild(span);
            container.appendChild(item);
        });
        
        document.getElementById('streaming-note').textContent = 'Disponibilidade pode variar por região';
    }

    /**
     * Définit les plateformes de streaming par défaut
     */
    function setDefaultStreamingProviders() {
        const container = document.getElementById('streaming-logos');
        container.innerHTML = `
            <div class="streaming-item">
                <img src="https://image.tmdb.org/t/p/original/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" alt="Netflix">
                <span>Netflix</span>
            </div>
            <div class="streaming-item">
                <img src="https://image.tmdb.org/t/p/original/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg" alt="HBO Max">
                <span>HBO Max</span>
            </div>
            <div class="streaming-item">
                <img src="https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg" alt="Disney+">
                <span>Disney+</span>
            </div>
        `;
        document.getElementById('streaming-note').textContent = 'Plataformas sugeridas - Verifique disponibilidade';
    }

    /**
     * Configure le bouton de trailer
     */
    function setupTrailerButton() {
        const trailerBtn = document.getElementById('play-trailer-btn');
        
        trailerBtn.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            
            if (!videoId) {
                alert('Trailer não disponível no momento.');
                return;
            }

            // Ouvrir YouTube dans un nouvel onglet
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
    }

    /**
     * Affiche un message d'erreur
     */
    function showError() {
        document.getElementById('movie-title').textContent = 'Filme não encontrado';
        document.getElementById('synopsis-text').textContent = 'O filme que você procura não está disponível.';
    }

})();
