const container = document.querySelector('#cards-container')

// Функция для получения и отображения постов
const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных')
        }

        const data = await response.json()
        const first20 = data.slice(0, 20)

        first20.forEach(post => {
            const card = document.createElement('div')
            card.classList.add('post-card')

            card.innerHTML = `
                <div class="post-photo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_5yWqAtupPfSP4jLhjHZEVJ6xwKc6CSCJA&s" alt="Image">
                </div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `

            container.appendChild(card)
        })

    } catch (error) {
        console.error('Ошибка:', error)
        container.innerHTML = `<p style="color: white;">Произошла ошибка при загрузке данных.</p>`
    }
}

fetchPosts()
