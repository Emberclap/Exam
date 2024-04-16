window.addEventListener("load", solve);

function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/games';
    const gameListElement = document.getElementById('games-list');
    const loadGamesBtnElement = document.getElementById('load-games');
    const [gameNameElement, gameTypeElement, numOfPlayersElement] = document.querySelectorAll('input')
    const addBtnElement = document.getElementById('add-game');
    const editBtnElement = document.getElementById('edit-game');

    let id;



    async function loadGames() {
        const response = await fetch(baseUrl);
        const games = await response.json();

        //editBtnElement.disabled = true;
        gameListElement.innerHTML = '';

        for (const game of Object.values(games)) {

            const name = game.name;
            const type = game.type;
            const players = Number(game.players);

            const gameDiv = document.createElement('div');
            gameDiv.classList.add('board-game');

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            contentDiv.innerHTML = `
                <p>${name}</p>
                <p>${type}</p>
                <p>${players}</p>`

            const changeBtn = document.createElement('button')
            changeBtn.classList.add('change-btn')
            changeBtn.textContent = 'Change'
            changeBtn.addEventListener('click', () => {
                gameNameElement.value = name;
                gameTypeElement.value = type;
                numOfPlayersElement.value = players;
                id = game._id;
                addBtnElement.disabled = true;
                editBtnElement.disabled = false;
                gameDiv.remove()

            })
            const delBtn = document.createElement('button')
            delBtn.classList.add('delete-btn')
            delBtn.textContent = 'Delete'
            delBtn.addEventListener('click', () => {
                fetch(`${baseUrl}/${game._id}`, {
                    method: 'DELETE'
                });

                loadGames();
            })

            const btnDiv = document.createElement('div');
            btnDiv.classList.add('buttons-container');
            btnDiv.appendChild(changeBtn);
            btnDiv.appendChild(delBtn);
            gameDiv.appendChild(contentDiv);
            gameDiv.appendChild(btnDiv)
            gameListElement.appendChild(gameDiv)

            clearInput()
        }
    }

    loadGamesBtnElement.addEventListener('click', loadGames);
    editBtnElement.addEventListener('click', async () => {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: gameNameElement.value,
                type: gameTypeElement.value,
                players: numOfPlayersElement.value,
                _id: id,
            })
        })
        if (!response.ok) {
            return;
        }
        addBtnElement.disabled = false;
        editBtnElement.disabled = true;
        clearInput()
        loadGames()
    });
    addBtnElement.addEventListener('click', async () =>{
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: gameNameElement.value,
                type: gameTypeElement.value,
                players: numOfPlayersElement.value,
            })
        })
        if (!response.ok) {
            return;
        }
        clearInput()
        loadGames()
    });

        function clearInput() {
            gameNameElement.value = '';
            gameTypeElement.value = '';
            numOfPlayersElement.value = '';
        }
}
