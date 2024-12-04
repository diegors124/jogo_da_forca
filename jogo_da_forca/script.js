// Banco de palavras por categoria
const wordList = {
    objetos: ["cadeira", "mesa", "computador", "livro", "caneta"],
    animais: ["gato", "cachorro", "elefante", "tigre", "leão"],
    frutas: ["maçã", "banana", "laranja", "abacaxi", "uva"]
};

let selectedCategory, selectedWord, hiddenWord, wrongTries, triedLetters;

// Função para iniciar o jogo
function startGame() {
    selectedCategory = document.getElementById('category').value;
    selectedWord = wordList[selectedCategory][Math.floor(Math.random() * wordList[selectedCategory].length)];
    hiddenWord = '_'.repeat(selectedWord.length);
    wrongTries = 6;
    triedLetters = [];

    document.getElementById('category-name').textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    document.getElementById('hidden-word').textContent = hiddenWord.split('').join(' ');
    document.getElementById('wrong-tries').textContent = wrongTries;
    document.getElementById('message').textContent = '';
    document.getElementById('letter-input').disabled = false;

    // Atualizar letras tentadas
    document.getElementById('tried-letters').textContent = "Nenhuma";

    updateHangmanImage();
}

// Função para tentar adivinhar uma letra
function guessLetter() {
    const letter = document.getElementById('letter-input').value.toLowerCase();

    if (!letter || triedLetters.includes(letter)) {
        return;  // Não permite letras repetidas
    }

    triedLetters.push(letter);
    document.getElementById('letter-input').value = '';  // Limpar o campo de entrada
    document.getElementById('letter-input').focus();  // Focar no campo de entrada

    // Atualizar letras tentadas na interface
    document.getElementById('tried-letters').textContent = triedLetters.join(', ');

    if (selectedWord.includes(letter)) {
        let updatedWord = '';
        for (let i = 0; i < selectedWord.length; i++) {
            updatedWord += (selectedWord[i] === letter) ? letter : hiddenWord[i];
        }
        hiddenWord = updatedWord;
        document.getElementById('hidden-word').textContent = hiddenWord.split('').join(' ');

        if (!hiddenWord.includes('_')) {
            document.getElementById('message').textContent = "Você venceu!";
            document.getElementById('letter-input').disabled = true;
        }
    } else {
        wrongTries--;
        document.getElementById('wrong-tries').textContent = wrongTries;
        updateHangmanImage();

        if (wrongTries === 0) {
            document.getElementById('message').textContent = `Você perdeu! A palavra era: ${selectedWord}`;
            document.getElementById('letter-input').disabled = true;
        }
    }
}

// Atualiza a imagem da forca conforme as tentativas
function updateHangmanImage() {
    document.getElementById('hangman-image').src = `forca${6 - wrongTries}.png`;
}

// Função para tentar adivinhar a palavra inteira
function guessWord() {
    const wordGuess = prompt("Tente adivinhar a palavra:");

    if (wordGuess && wordGuess.toLowerCase() === selectedWord) {
        document.getElementById('message').textContent = "Você venceu!";
        document.getElementById('letter-input').disabled = true;
    } else {
        wrongTries = 0;
        document.getElementById('wrong-tries').textContent = wrongTries;
        updateHangmanImage();
        document.getElementById('message').textContent = `Você perdeu! A palavra era: ${selectedWord}`;
        document.getElementById('letter-input').disabled = true;
    }
}
