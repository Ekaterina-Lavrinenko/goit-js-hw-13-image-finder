import './css/common.css';
import PhotosApiService from './js/components/apiService';
import photoImg from './templates/images.hbs';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    imagesContainer: document.querySelector('.js-images-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};
const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    photosApiService.query = e.currentTarget.elements.query.value;
    photosApiService.resetPage();
    photosApiService.fetchImages().then(hits => {
        clearImagesContainer();
        appendImagesMarkup(hits);
    });
}

function onLoadMore() {
    photosApiService
        .fetchImages()
        .then(appendImagesMarkup)
        .then(scroll);
}

function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', photoImg(hits));
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
