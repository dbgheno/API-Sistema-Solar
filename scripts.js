// 1. Consuma a API: Utilize o endpoint /bodies para obter uma lista de corpos celestes. Armazene esses dados em um array para futuras operações.
// ● Detalhes: Use axios para fazer a requisição à API. Certifique-se de tratar possíveis erros que possam ocorrer durante a requisição.
axios.get('https://api.le-systeme-solaire.net/rest/bodies/')

    .then((response) => {
        const bodies = response.data.bodies;
        // o const aqui está criando a variável bodies que armazena um array de todos os dados da lista de corpos celestes da API, dados esses que foram puxados pelo axios.get com a URL da API e o caminho response.data.bodies.
        console.log(1, bodies); // aqui apenas a exposição do array coletado acima
        const planets = ex2(bodies);
        // chamando (executando) a função ex2 escrita lá embaixo no exercício 2. A função está sendo chamada dentro do escopo do .then do axios get, pois a utilização dos dados da APIpelo axios (ou mesmo fetch) se dá de forma assíncrona e a chamada da função dentro do then aguardará e ocorrerá apenas quando o GET já tiver importado os dados com sucesso.
        // o const aqui esta criando a variável planets para armazenar os corpos celestes da classe "planetas". Essa variável torna prática a utilização de dados exclusivos dos planetas da API, para serem trabalhados em outros exercícios que lidam diretamente com eles.
        ex3(planets);
        ex4(planets);
        ex5(planets);
        ex6(planets); // em todos estes exercícios é utilizado a variável const planets que contém o array dos planets filtrado de bodies no ex2
        ex7(planets);
        ex8(planets);
        // ex8b(planets);
        ex9(planets);
        ex10(bodies);
        ex11(bodies);
        ex12(planets);
        const bodyTypes = ex13(bodies); // a const bodyTypes é um array dos corpos celestes classificados por tipo (array construído na função 13) 
        ex14(bodyTypes);
        ex15(planets);
        ex16(planets);
        ex17(bodies, 'Pluto', 'Saturn');
        ex18(planets);
        ex19(planets);
    })

    .catch((error) => {
        // o .catch é um retorno que substitui o .then em caso de ocorrer algum erro na requisição
        console.error('Erro na requisição:', error);
    });
//

// 2. Filtre os Planetas: Use o método filter para criar um novo array contendo apenas planetas.
// ● Detalhes: Cada objeto da API contém um campo que especifica o tipo do corpo celeste (por exemplo, planeta, estrela, lua, etc.). Use esse campo como critério para o filtro.
function ex2(bodies) {
    const planets = bodies.filter(body => body.isPlanet); // filtra todos os elementos(objetos) do array bodies cuja propriedade isPlanet contém "true"
    console.log(2, planets)
    return planets; // retorna a const/array planets quando chamada
}

// 3. Encontre a Terra: Use o método find para encontrar o objeto que representa a Terra no array filtrado.
// ● Detalhes: Você deve procurar pelo objeto cujo campo de nome seja igual a "Earth".
function ex3(planets) {
    const earth = planets.find(planet => planet.englishName === 'Earth'); // o .find vasculha o array planets e retorna o elemento/objeto cuja propriedade englishName se equivale a 'Earth'
    console.log(3, earth);
}

// 4. Verifique Condições com some: Use o método some para verificar se algum planeta no array filtrado não tem luas.
// ● Detalhes: Alguns planetas não possuem luas e isso é especificado em um dos campos do objeto. Use esse campo para realizar a verificação.
function ex4(planets) {
    const noMoon = planets.some(planet => planet.moons === null); // o .some verifica se há algum elemento/objeto dos planets que não possui lua, se sim retorna true
    console.log(4, noMoon);
}

// 5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas.
// ● Detalhes: O novo array deve ser uma lista de strings, onde cada string é o nome de um planeta.
function ex5(planets) {
    const names = planets.map(planet => planet.name); // o .map retorna apenas as propriedades dos elementos/objetos definidos em sua função. Nesse caso retornou o valor das propriedades "name" de cada planeta
    console.log(5, names);
}

// 6. Classificação por Tamanho: Use os métodos map e sort para criar um novo array que contenha os nomes dos planetas, ordenados pelo seu tamanho (raio).
// ● Detalhes: Utilize map para extrair os raios e os nomes dos planetas em um novo array. Depois, use sort para ordenar esse array com base no raio.
function ex6(planets) {
    const sorted = planets.sort((a, b) => b.meanRadius - a.meanRadius) // o .sort ordena em escala numérica ou alfabética do menor(a) para o maior(b) ou vice-versa.
        .map(planet => planet.name); // o .map está sendo aplicado sobre o sort e está extraindo apenas os nomes dos planetas já ordenados do maior para o menor
    console.log(6, sorted);
}

// 7. Informações Concatenadas: Use o método join para criar uma string que contenha os nomes de todos os planetas do array, separados por vírgulas.
// ● Detalhes: A string resultante deve ser algo como "Mercúrio, Vênus, Terra, Marte,...".
function ex7(planets) {
    const concat = planets.sort((a, b) => a.semimajorAxis - b.semimajorAxis) // aqui o .sort ordenou os planetas por sua distância do sol, do mais perto ao mais longe (perihelion é a menor distância que a órbita de um planeta alcança do sol - aphelion é a maior distância - peri de próximo, no entorno, e apo de longe (em grego) - semimajorAxis éa distância média da elipse orbital de um planeta) 
        .map(planet => planet.name) // o .map está aplicado ao sort extraindo apenas os nomes
        .join(', '); // o .join está aplicado ao map e faz com que o array se torne uma única string onde cada elemento se encontra em série e separados pela sua definição, neste caso a ', '
    console.log(7, concat);
}

// 8. Sistema Solar Compacto: Use os métodos para pegar os 5 menores planetas e calcular a massa total desses planetas.
function ex8(planets) {
    const somaMassas = planets.sort((a, b) => a.meanRadius - b.meanRadius) // planets sorteados por tamanho
        .slice(0, 5) // o .slice está aplicado ao sorteio por tamanho e pega apenas a fatia do elemento 0 ao 5, os cinco primeiros
        .reduce((total, planet) => total + (planet.mass.massValue * 10 ** planet.mass.massExponent), 0); // o .reduce funciona com um acumulador, equivalente a criar uma let som e ir adicionando valors de um for nesta soma. O "total" é seu acumulador, definido ao final de sua definição com início em 0. A cada iteração do reduce, ele pega o valor da massa do planeta e adiciona ao seu total. O cálculo (planet.mass.massValue * 10 ^ planet.mass.massExponent) é a forma científica utilizada para computar a massa de um astro.
    console.log(8, somaMassas);
}
//função de teste para retornar os valores das massas dos 5 planetas trabalhados no ex8
function ex8b(planets) {
    const mass = planets.sort((a, b) => a.meanRadius - b.meanRadius)
        .map(planet => planet.mass)
        .slice(0, 5)
    console.log(mass)
}

// 9. Luas e Densidade: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas entre eles que tem densidade maior que 1
function ex9(planets) {
    const planetas = planets
        .filter(planet => planet.moons != null && planet.moons.length >= 2 && planet.density > 1); // aqui o .filter filtra entre os planetas quais atendem as 3 condições: ser diferente de não ter lua, possuir mais ou igual a duas luas e possuir densidade maior que 1
    console.log(9, planetas);
}

// 10. Ordem de descobrimento: Encontre e imprima na tela todos nomes dos astros e suas respectivas datas de descoberta (os que tiverem), ordenando-os do mais recente ao mais antigo.
function ex10(bodies) {
    const ordemData = bodies
        .filter(body => body.discoveryDate !== '') // filtrou só os que possuem discoveryDate diferentes de string vazia
        .sort((a, b) => a.discoveryDate.split('/').reverse().join() < b.discoveryDate.split('/').reverse().join() ? -1 : 1)
    // o .split pegou a string 07/01/1610 e criou um array ['07', '01', '1610']. O .reverse inverteu a ordem dos elementos desse array deixando-o ['1610', '01', '07']. O .join transformou o array revertido de volta numa string como os elementos escritos em série, se tornando '16100107'. O ternário testou se o elemento "a" é menor que o "b" e retornou -1 quando sim e 1 quando não. Com o -1 e o 1 o sort encadeia comparação em comparação trazendo os -1 para frente e pondo os 1 para trás.
    console.log(10, ordemData);
}

// 11. Encontrando Astro: Faça uma função que recebe um nome, e retorna a distancia, a massa, gravidade e densidade.
function ex11(bodies) {
    const name = 'Earth';
    // const name = prompt('Insira o nome do astro (inglês):');
    if (!name) { return null; }

    const body = bodies.find(body => body.englishName === name); // o .find buscou entre os bodies qual possui o nome buscado

    const info = { // a const info cria um objeto (info) que possui as propriedades descritas abaixo e extraídas do body encontrando pelo find
        name: body.englishName,
        distance: body.semimajorAxis,
        mass: body.mass.massValue * 10 ** body.mass.massExponent,
        gravity: body.gravity,
        density: body.density
    };

    console.log(11);
    console.table(info); //console table imprime uma tabela no console ao invés de um texto linear
}

// 12. Filtro de Temperatura: encontre os planetas que tem uma temperatura de 8 a 30 graus Celsius. Cuidado que o AvgTemp está na escala Kelvin. Ordene-os do mais frio ao mais quente.
function ex12(bodies) {
    const temperaturePlanets = bodies.filter(planet => (planet.avgTemp - 273) >= 8 && (planet.avgTemp - 273) <= 30);
    console.log(12, temperaturePlanets);
}

// 13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os planetas pelo seu tipo. bodyType
function ex13(bodies) {
    const bodyTypes = {};
    bodies.forEach(body => {
        if (bodyTypes[body.bodyType]) { // verifica se o objeto bodyTypes já possui uma propriedade equivalente ao bodyType do body verificado na iteração
            bodyTypes[body.bodyType].push(body) // se sim, adiciona o body ao array da propriedade equivalente ao seu bodyType
        } else {
            bodyTypes[body.bodyType] = [body,]; // se não, adiciona uma nova propriedade com o nome do bodyType e atribui a ela um array com o body da iteração
        } // dessa forma será adicionados todos os bodyTypes encontrados  como propriedade que conterão arrays com cada body pertencente aos tipos encontrados, sem causar repetição das propriedades.
    });

    console.log(13, bodyTypes);
    return bodyTypes;
}

// 14. Ordenação Complexa: Use sort e slice para ordenar os planetas primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.
function ex14(bodyTypes) {
    const orderBySize = {};

    for (const bodyType in bodyTypes) { // o "for in" aqui percorre cada propriedade do objeto bodyTypes
        orderBySize[bodyType] = bodyTypes[bodyType].sort((a, b) => b.meanRadius - a.meanRadius).slice(0, 3); // o slice está aplicado ao sort e pega apenas os 3 primeiros elementos sorteados. o .sort ordena por tamanho cada elemento de cada propriedade do objeto bodyTypes e em cada iteração do "for in", o orderBySize recebe uma propriedade de cada BodyType com seus 3 maiores body
    }
    console.log(14, orderBySize);
}

// 15. Encontrando planetas orbitados. Encontre todos os planetas que são orbitados por pelo menos um corpo celeste. Imprima na tela o nome do planeta e seus orbitadores.
function ex15(planets) {
    const orbitedPlanets = {};

    planets.forEach(planet => { // o forEach percorreu cada planeta do planets e 
        if (planet.moons !== null) { // verificou se possuíam alguma lua
            orbitedPlanets[planet.englishName] = planet.moons; // se sim, criou uma propriedade de cada planeta para objeto orbitedPlanets e atribuiu o array moons do planeta à propriedade
        }
    });
    console.log(15, orbitedPlanets);
}

// 16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.
function ex16(planets) {
    const totalMass = planets.reduce((totalMass, planet) => totalMass + (planet.mass.massValue * 10 ** planet.mass.massExponent), 0)
    const avgMass = totalMass / planets.length; // somou todas as massas dos planetas pelo reduce e dividiu-se pelo total de elementos do array planets para se obter a média das massas
    console.log(16, avgMass)
}

// 17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas
function ex17(bodies, first, second) { // os nomes de saturno e plutão foram passados como argumento na chamada da função, atribuídos a 'first' e 'second'
    const planetOne = bodies.find(body => body.englishName === first)
    const planetTwo = bodies.find(body => body.englishName === second) // foi utilizado .find para encontrar os bodies com os respectivos nomes
    const closerDistance =
        planetOne.aphelion > planetTwo.aphelion ? // aqui o ternário verificou qual era o mais distante
        planetOne.perihelion - planetTwo.aphelion : // fez-se a menor distância (perihelion) do mais distante menos a maior distância (aphelion) do menos distante
        planetTwo.perihelion - planetOne.aphelion
    console.log(17, `A menor distância entre ${first} e ${second} é ${closerDistance}`)
}

// 18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem.
function ex18(planets) {
    console.log(18);
    planets.forEach(planet => { // o forEach percorreu cada planetas de planets
        if (planet.moons !== null) { // verificou-se os que tinham luas
            console.log(planet.englishName + ' has ' + planet.moons.length + ' moons.'); // stringou-se cada nome de planeta + sua quantidade de luas (planet.moons.length)
        }
    });
}

// 19. O Desafio Final em Manipulação de Dados e Cálculos
// Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar.
// -a) Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.).
// -b) Crie um novo array que contém apenas as massas dos planetas. - Ordene o array de massas em ordem crescente.
// -c) Calcule a mediana das massas dos planetas. A mediana é o valor do meio em um conjunto de dados ordenado. Se o conjunto tem um número ímpar de observações, a mediana é o valor do meio. Se o conjunto tem um número par de observações, a mediana é a média dos dois valores do meio.
// -d) Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada.
function ex19(planets) {
    console.log(19)
    // a)
    console.log('a)', planets) // simplesmente imprimi no console o array filtrado de planetas já existente desde o exercício 2

    // b)
    const planetMasses = planets.map(planet => (planet.mass.massValue * 10 ** planet.mass.massExponent)).sort((a, b) => a - b);
    console.log('b)', planetMasses) // acima obtive a massa de todos os planetas e a ordenei pelo sort da menor para a maior

    // c)
    let median; // variável vazia da mediana que receberá valor após o condicional if/else
    if (planetMasses.length % 2 === 0) { // se o length dos planetMasses for par (se resta 0 de sua divisão por 2)
        const x = planetMasses.length / 2; // divide o length por 2 e atribui o valor a 'x'
        const y = x - 1;                   // subtrai 1 de x e atribui a 'y' fazendo com que y equivalha ao primeiro dos dois elementos do meio do array e x ao segundo
        median = (planetMasses[x] + planetMasses[y]) / 2; // soma os dois elementos do meio e divide por 2
    } else { median = planetMasses[Math.floor(planetMasses.length / 2)]; } // se o length não for par, basa encontra o elemento do meio, divide-se o length por 2 e arredonda-se para baixo
    console.log('c)', median)

    // d) - Teste do planeta cuja massa é a mais próxima da mediana dos planetas
    let closerValue = Infinity; // usei o 'Infinity' para representar um valor maior que qualquer outro numérico expresso
    let index; 

    planetMasses.forEach((mass, i) => {
        const value = Math.abs(mass - median); // para cada mass, reduz-se dela o valor da mediana. O Math.abs converte para positivo caso resulte negativo
        if (value < closerValue) { // se o valor da massa - mediana for menor que o closerValue (na primeira iteração será certamente, já que está se comparando ao Infinity)
            closerValue = value; // troca-se o valor da let closerValue e na iteração seguinte este novo valor será comparado com o próximo
            index = i; // atribui-se à let index o índice da iteração que substituiu o valor de closerValue pelo do value. Após todas iterações, o index manterá a referencia daquela que obteve o menor valor de value
        }
    });

    const closerMedianMassPlanet = planets.find((planet) => (planet.mass.massValue * 10 ** planet.mass.massExponent) === planetMasses[index]) // encontra-se o planeta que possui a massa que obteve o menor resultado no teste de proximidade da mediana
    console.log('d)', `O planeta cuja massa é mais próxima da mediana das massas é ${closerMedianMassPlanet.englishName} e sua massa é ${planetMasses[index]}`)
}

