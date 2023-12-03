function ex1(data) {
    console.log(1, data);
}

function ex2(data) {
    const planets = data.filter(body => body.isPlanet);
    console.log(2, planets)

    return planets;
}

function ex3(data) {
    const earth = data.find(body => body.englishName === 'Earth');
    console.log(3, earth);    
}

function ex4(data) {
    const noMoon = data.some(body => body.moons === null);
    console.log(4, noMoon);
}

function ex5(data) {
    const names = data.map(body => body.name);
    console.log(5, names);
}

function ex6(data) {
    const sorted = data.sort((a, b) => b.meanRadius - a.meanRadius)
        .map(planet => planet.name);
    console.log(6, sorted);
}

function ex7(data) {
    const concat = data.sort((a, b) => a.perihelion - b.perihelion)
        .map(planet => planet.name)
        .join(', ');

    console.log(7, concat);
}

function ex8(data) {
    const concat = data
        .sort((a, b) => a.meanRadius - b.meanRadius)
        .slice(0, 5)
        .reduce((total, planet) => total + (planet.mass.massValue*10^planet.mass.massExponent),0);
    
    console.log(8, concat);
}

function ex9(data) {
    const planets = data
        .filter(planet => planet.moons != null && planet.moons.length >= 2 && planet.density > 1);
    
    console.log(9, planets);
}

function ex10(data) {
    const bodys = data
        .filter(body => body.discoveryDate !== '')
        .sort((a, b) => {
            const numA = new Date(a.discoveryDate.split('/').reverse().join('-'));
            const numB = new Date(b.discoveryDate.split('/').reverse().join('-'));
            
            return numB - numB;
        })
    
    console.log(10, bodys);
}

function ex11(data) {
    const name = 'Earth';
    // const name = prompt('Insira o nome do astro (inglês):');

    if (!name) {
        return null;
    }

    const body = data.find(body => body.englishName === name);
    
    const info = {
        name: body.englishName,
        distance: body.semimajorAxis,
        mass: body.mass.massValue*10^body.mass.massExponent,
        gravity: body.gravity,
        density: body.density
    };
  
    console.log(11);
    console.table(info);
}

function ex12(data) {
    const temperatureFilteredPlanets = data.filter(planet => (planet.avgTemp - 273) >= 8 && (planet.avgTemp - 273) <= 30);

    console.log(temperatureFilteredPlanets);
}

function ex13(data) {
    const bodyTypes = {};
    data.forEach(body => {
        if (bodyTypes[body.bodyType]) {
            bodyTypes[body.bodyType].push(body)
        } else {
            bodyTypes[body.bodyType] = [body,];
        }
    });

    console.log(13, bodyTypes);
    return bodyTypes;
}

function ex14(data) {
    const OrderBySize = {};

    // Acessar os arrays do objeto dinamicamente
    for (const bodyType in data) {

        // Ordenação do array
        const filtered = data[bodyType].sort((a, b) => b.meanRadius - a.meanRadius).slice(0, 3);
        
        OrderBySize[bodyType] = filtered;
    }

    console.log(14, OrderBySize);
}

function ex15(data) {
    const orbitedPlanets = [];

    console.log(15);
    data.forEach(planet => {
        if (planet.moons !== null) {
            console.log(planet.englishName);

            console.log(planet.moons.map(moon => moon.moon).join(', '));
        }
    });
}

function ex16(data) {
    const totalMass = data.reduce((totalMass, planet) => totalMass + (planet.mass.massValue*10^planet.mass.massExponent), 0)
    const med = totalMass / data.length;

    console.log(16, med)
}

function ex17(data, firstPlanetName, secondPlanetName) {
    const planets = [data.find(body => body.englishName === firstPlanetName),
        data.find(body => body.englishName === secondPlanetName)
    ];

    if (!(planets[0].aphelion > planets[1].aphelion)) {
        planets.reverse;
    }
    const closerDisntace = planets[0].perihelion - planets[1].aphelion;

    console.log(17, closerDisntace)
}

function ex18(data) {
    const orbitedPlanets = [];

    console.log(18);
    data.forEach(planet => {
        if (planet.moons !== null) {
            console.log(planet.englishName + ' has ' + planet.moons.length + ' moons.');
        }
    });
}

function ex19(data) {
    const planetMasses = data.map(planet => (planet.mass.massValue*10^planet.mass.massExponent)).sort();

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

    const planetAproachMass = data.find(planet => (planet.mass.massValue*10^planet.mass.massExponent) === planetMasses[index]); 
    console.log(19, planetAproachMass)
}

axios.get('https://api.le-systeme-solaire.net/rest/bodies/').then((result) => {
    const data = result.data.bodies;

    // 1. Consuma a API:
    ex1(data);

    // 2. Filtre os Planetas:
    const filteredPlanets = ex2(data);

    // 3. Encontre a Terra:
    ex3(filteredPlanets);

    // 4. PLanetas sem lua:
    ex4(filteredPlanets);
    
    // 5. Transforme os Dados com map:
    ex5(filteredPlanets);
    
    // 6. Classificação por Tamanho:
    ex6(filteredPlanets);

    // 7. Informações Concatenadas
    ex7(filteredPlanets);
    
    // 8. Sistema Solar Compacto
    ex8(filteredPlanets);

    // 9. Luas e Desidade
    ex9(filteredPlanets);
    
    // 10. Ordem de descobrimento
    ex10(data);

    // 11. Encontrando Astro
    ex11(data);

    // 12. Filtro de Temperatura
    ex12(filteredPlanets);
    
    // 13. Separando Planetas
    const bodyTypesFiltered = ex13(data);

    // 14. Ordenação Complexa
    ex14(bodyTypesFiltered);
    
    // 15. Encontrando planetas orbitados
    ex15(filteredPlanets);
    
    // 16. Média da Massa dos Planetas
    ex16(filteredPlanets);
    
    // 17. Calcule a distância entre Saturno e Plutão.
    ex17(data, 'Pluto', 'Saturn');
    
    // 18. Planetas com Luas
    ex18(filteredPlanets);

    // 19. O Desafio Final em Manipulação de Dados e Cálculos 
    ex19(filteredPlanets);
});