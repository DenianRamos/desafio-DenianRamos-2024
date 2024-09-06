class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: 'savana' },
            'LEOPARDO': { tamanho: 2, bioma: 'savana' },
            'CROCODILO': { tamanho: 3, bioma: 'rio' },
            'MACACO': { tamanho: 1, bioma: 'savana ou floresta' },
            'GAZELA': { tamanho: 2, bioma: 'savana' },
            'HIPOPOTAMO': { tamanho: 4, bioma: 'savana ou rio' }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animais[animal];
        const recintosViaveis = [];

        this.recintos.forEach(recinto => {
            const { numero, bioma, tamanhoTotal, animais } = recinto;
            const tamanhoAtual = animais.reduce((acc, curr) => acc + (this.animais[curr.especie].tamanho * curr.quantidade), 0);
            const tamanhoDisponivel = tamanhoTotal - tamanhoAtual;
            const espacoNecessario = quantidade * animalInfo.tamanho;

            const biomasValidos = animalInfo.bioma.split(' ou ');
            const biomaValido = biomasValidos.some(validBioma => bioma.includes(validBioma));

            if (biomaValido && tamanhoDisponivel >= espacoNecessario) {
                if (animal === 'MACACO' && quantidade === 1) {
                    return; // Um macaco sozinho não é aceitável
                }
                if (animal === 'HIPOPOTAMO' && !bioma.includes('savana e rio')) {
                    return; // Hipopótamo só aceita "savana e rio"
                }
                if (animal === 'CROCODILO' && bioma === 'rio') {
                    recintosViaveis.push(`Recinto ${numero} (espaço livre: ${tamanhoDisponivel - espacoNecessario} total: ${tamanhoTotal})`);
                } else if (animal !== 'CROCODILO' && !animais.some(a => this.animais[a.especie].bioma === animalInfo.bioma)) {
                    recintosViaveis.push(`Recinto ${numero} (espaço livre: ${tamanhoDisponivel - espacoNecessario} total: ${tamanhoTotal})`);
                }
            }
        });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis: recintosViaveis.sort() };
        } else {
            return { erro: 'Não há recinto viável' };
        }
    }
}

export { RecintosZoo as RecintosZoo };