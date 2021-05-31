import './css/common.css';
import PhotosApiService from './js/components/apiService';
import photoArticle from './templates/articles.hbs';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};
const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.query.value;
    photosApiService.resetPage();
    photosApiService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
    photosApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', photoArticle(articles));
}


