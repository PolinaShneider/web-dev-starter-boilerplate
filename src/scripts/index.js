import ajax from '@codexteam/ajax';

const jsonFromFile = document.getElementById('jsonFromFile');
const jsonFromLink = document.getElementById('jsonFromLink');

jsonFromFile.addEventListener('click', function() {
    ajax.get({
        url: 'http://localhost:8008/fromFile'
    }).then((result) => {
        console.log('Результат чтения JSON из файла:', result.body.data);
    }).catch((error) => {
        console.log('Ошибка чтения JSON из файла:', error);
    })
});

jsonFromLink.addEventListener('click', function () {
    const url = prompt('Введите ссылку с JSON', 'https://jsonplaceholder.typicode.com/posts?userId=1');

    ajax.get({
        url: 'http://localhost:8008/fetchUrl',
        data: {
            url
        }
    }).then((result) => {
        console.log('Результат чтения JSON по ссылке:', result.body.data);
    }).catch((error) => {
        console.log('Ошибка чтения JSON по ссылке:', error);
    })
});
