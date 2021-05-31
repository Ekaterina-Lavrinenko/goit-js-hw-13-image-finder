export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log('До запроса: ', this);
        const url = `https://pixabay.com/api/?key=21875421-f37db16cddbf605dc200aebe0&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;
        return fetch(url)
        .then(r => r.json())
            .then(data => {
                this.incrementPage();
                console.log('После запроса, когда все ОК: ', this);
                return data.articles;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}