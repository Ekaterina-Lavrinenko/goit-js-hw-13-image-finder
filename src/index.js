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
    photosApiService.fetchArticles().then(hits => {
        clearArticlesContainer();
        appendArticlesMarkup(hits);
    });
}

function onLoadMore() {
    photosApiService
        .fetchArticles()
        .then(appendArticlesMarkup)
        .then(scroll);
}

function appendArticlesMarkup(hits) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', photoArticle(hits));
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
