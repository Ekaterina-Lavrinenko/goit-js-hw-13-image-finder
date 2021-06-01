const API_KEY = '21875421-f37db16cddbf605dc200aebe0';
const BASE_URL = 'https://pixabay.com/api';

export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        // console.log('До запроса: ', this);
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        return fetch(url)
        .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
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