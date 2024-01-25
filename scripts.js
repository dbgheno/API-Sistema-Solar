axios.get('https://api.le-systeme-solaire.net/rest/bodies/')

    .then((response) => {
        const bodies = response.data.bodies; 
        // o const aqui está criando a variável bodies que vem a ser um array de todos os dados da lista de corpos celestes da API (ex1 - L74)


        // EXERCÍCIOS //
        ex1(bodies); 
        // chamando (executando) a função ex1 escrita lá embaixo no exercício 1. A função está sendo chamada dentro do escopo do .then do axios get, pois como a utilização dos dados da API pelo axios (ou mesmo fetch) se dá de forma assíncrona, a chamada da função dentro do then aguardará e ocorrerá apenas quando o GET já tiver importado os dados com sucesso.
        const filteredPlanets = ex2(bodies); 
        // o consto aqui esta criando a variável filteredPlanets para armazenar os corpos celestes da classe "planetas". Essa variável torna prática a utilização de dados exclusivos dos planetas da API, para serem trabalhados em outros exercícios que lidem diretamente com eles.
        ex3(filteredPlanets);
        ex4(filteredPlanets);
        ex5(filteredPlanets);
        ex6(filteredPlanets);
        ex7(filteredPlanets);
        ex8(filteredPlanets);
        ex9(filteredPlanets);
        ex10(bodies);
        ex11(bodies);
        ex12(filteredPlanets);
        const bodyTypesFiltered = ex13(bodies);
        ex14(bodyTypesFiltered);
        ex15(filteredPlanets);
        ex16(filteredPlanets);
        ex17(bodies, 'Pluto', 'Saturn');
        ex18(filteredPlanets);
        ex19(filteredPlanets);
    })

    .catch((error) => {
        // Se ocorrer um erro durante a requisição
        console.error('Erro na requisição:', error);
    });
//


// 1. Consuma a API: Utilize o endpoint /bodies para obter uma lista de corpos celestes. Armazene esses dados em um array para futuras operações.
// ● Detalhes: Use axios para fazer a requisição à API. Certifique-se de tratar possíveis erros que possam ocorrer durante a requisição.
function ex1(bodies) {
    console.log(1, bodies);
}

// 2. Filtre os Planetas: Use o método filter para criar um novo array contendo apenas planetas.
// ● Detalhes: Cada objeto da API contém um campo que especifica o tipo do corpo celeste (por exemplo, planeta, estrela, lua, etc.). Use esse campo como critério para o filtro.
function ex2(bodies) {
    const planets = bodies.filter(body => body.isPlanet);
    console.log(2, planets)

    return planets;
}

// 3. Encontre a Terra: Use o método find para encontrar o objeto que representa a Terra no array filtrado.
// ● Detalhes: Você deve procurar pelo objeto cujo campo de nome seja igual a "Earth".
function ex3(bodies) {
    const earth = bodies.find(body => body.englishName === 'Earth');
    console.log(3, earth);
}

// 4. Verifique Condições com some: Use o método some para verificar se algum planeta no array filtrado não tem luas.
// ● Detalhes: Alguns planetas não possuem luas e isso é especificado em um dos campos do objeto. Use esse campo para realizar a verificação.
function ex4(bodies) {
    const noMoon = bodies.some(body => body.moons === null);
    console.log(4, noMoon);
}

// 5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas.
// ● Detalhes: O novo array deve ser uma lista de strings, onde cada string é o nome de um planeta.
function ex5(bodies) {
    const names = bodies.map(body => body.name);
    console.log(5, names);
}

// 6. Classificação por Tamanho: Use os métodos map e sort para criar um novo array que contenha os nomes dos planetas, ordenados pelo seu tamanho (raio).
// ● Detalhes: Utilize map para extrair os raios e os nomes dos planetas em um novo array. Depois, use sort para ordenar esse array com base no raio.
function ex6(bodies) {
    const sorted = bodies.sort((a, b) => b.meanRadius - a.meanRadius)
        .map(planet => planet.name);
    console.log(6, sorted);
}

// 7. Informações Concatenadas: Use o método join para criar uma string que contenha os nomes de todos os planetas do array, separados por vírgulas.
// ● Detalhes: A string resultante deve ser algo como "Mercúrio, Vênus, Terra, Marte,...".
function ex7(bodies) {
    const concat = bodies.sort((a, b) => a.perihelion - b.perihelion)
        .map(planet => planet.name)
        .join(', ');

    console.log(7, concat);
}

// 8. Sistema Solar Compacto: Use os métodos para pegar os 5 menores planetas e calcular a massa total desses planetas.
function ex8(bodies) {
    const concat = bodies
        .sort((a, b) => a.meanRadius - b.meanRadius)
        .slice(0, 5)
        .reduce((total, planet) => total + (planet.mass.massValue * 10 ^ planet.mass.massExponent), 0);

    console.log(8, concat);
}

// 9. Luas e Desidade: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas entre eles que tem densidade maior que 1
function ex9(bodies) {
    const planets = bodies
        .filter(planet => planet.moons != null && planet.moons.length >= 2 && planet.density > 1);

    console.log(9, planets);
}

// 10. Ordem de descobrimento: Encontre e imprima na tela todos nomes dos astros e suas respectivas datas de descoberta (os que tiverem), ordenando-os do mais recente ao mais antigo.
function ex10(bodies) {
    const bodys = bodies
        .filter(body => body.discoveryDate !== '')
        .sort((a, b) => {
            const numA = new Date(a.discoveryDate.split('/').reverse().join('-'));
            const numB = new Date(b.discoveryDate.split('/').reverse().join('-'));

            return numB - numB;
        })

    console.log(10, bodys);
}

// 11. Encontrando Astro: Faça uma função que recebe um nome, e retorna a distancia, a massa, gravidade e densidade
function ex11(bodies) {
    const name = 'Earth';
    // const name = prompt('Insira o nome do astro (inglês):');

    if (!name) {
        return null;
    }

    const body = bodies.find(body => body.englishName === name);

    const info = {
        name: body.englishName,
        distance: body.semimajorAxis,
        mass: body.mass.massValue * 10 ^ body.mass.massExponent,
        gravity: body.gravity,
        density: body.density
    };

    console.log(11);
    console.table(info);
}

// 12. Filtro de Temperatura: econtre os planetas que tem uma temperatura de 8 a 30 graus celsius. Cuidado que o AvgTemp está na escala Kelvin. Ordene-os do mais frio ao mais quente.
function ex12(bodies) {
    const temperatureFilteredPlanets = bodies.filter(planet => (planet.avgTemp - 273) >= 8 && (planet.avgTemp - 273) <= 30);

    console.log(temperatureFilteredPlanets);
}

// 13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os planetas pelo seu tipo. bodyType
function ex13(bodies) {
    const bodyTypes = {};
    bodies.forEach(body => {
        if (bodyTypes[body.bodyType]) {
            bodyTypes[body.bodyType].push(body)
        } else {
            bodyTypes[body.bodyType] = [body,];
        }
    });

    console.log(13, bodyTypes);
    return bodyTypes;
}

// 14. Ordenação Complexa: Use sort e slice para ordenar os planetas primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.
function ex14(bodies) {
    const OrderBySize = {};

    // Acessar os arrays do objeto dinamicamente
    for (const bodyType in bodies) {

        // Ordenação do array
        const filtered = bodies[bodyType].sort((a, b) => b.meanRadius - a.meanRadius).slice(0, 3);

        OrderBySize[bodyType] = filtered;
    }

    console.log(14, OrderBySize);
}

// 15. Encontrando planetas orbitados. Encontre todos os planetas que são orbitados por pelo menos um corpo celeste. Imprima na tela o nome do planeta e seus orbitadores.
function ex15(bodies) {
    const orbitedPlanets = [];

    console.log(15);
    bodies.forEach(planet => {
        if (planet.moons !== null) {
            console.log(planet.englishName);

            console.log(planet.moons.map(moon => moon.moon).join(', '));
        }
    });
}

// 16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.
function ex16(bodies) {
    const totalMass = bodies.reduce((totalMass, planet) => totalMass + (planet.mass.massValue * 10 ^ planet.mass.massExponent), 0)
    const med = totalMass / bodies.length;

    console.log(16, med)
}

// 17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas
function ex17(bodies, firstPlanetName, secondPlanetName) {
    const planets = [bodies.find(body => body.englishName === firstPlanetName),
    bodies.find(body => body.englishName === secondPlanetName)
    ];

    if (!(planets[0].aphelion > planets[1].aphelion)) {
        planets.reverse;
    }
    const closerDisntace = planets[0].perihelion - planets[1].aphelion;

    console.log(17, closerDisntace)
}

// 18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem.
function ex18(bodies) {
    const orbitedPlanets = [];

    console.log(18);
    bodies.forEach(planet => {
        if (planet.moons !== null) {
            console.log(planet.englishName + ' has ' + planet.moons.length + ' moons.');
        }
    });
}

// 19. O Desafio Final em Manipulação de Dados e Cálculos
// Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar.
// - Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.).
// - Crie um novo array que contém apenas as massas dos planetas. - Ordene o array de massas em ordem crescente.
// - Calcule a mediana das massas dos planetas. A mediana é o valor do meio em um conjunto de dados ordenado. Se o conjunto tem um número ímpar de observações, a mediana é o valor do meio. Se o conjunto tem um número par de observações, a mediana é a média dos dois valores do meio.
// - Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada.
function ex19(bodies) {
    const planetMasses = bodies.map(planet => (planet.mass.massValue * 10 ^ planet.mass.massExponent)).sort();

    let median;
    if (planetMasses.length % 2 == 0) {
        const x = planetMasses.length / 2;
        const y = x - 1;
        median = (planetMasses[x] + planetMasses[y]) / 2;

    } else {
        median = planetMasses[Math.floor(planetMasses.length / 2)];
    }

    let aproachValue = Number.MAX_SAFE_INTEGER;
    let index;
    planetMasses.forEach((mass, i) => {
        const value = Math.abs(mass - median);
        if (value < aproachValue) {
            aproachValue = value;
            index = i;
        }
    });

    const planetAproachMass = bodies.find(planet => (planet.mass.massValue * 10 ^ planet.mass.massExponent) === planetMasses[index]);
    console.log(19, planetAproachMass)
}
