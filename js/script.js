ready(function(){

  // В этом месте должен быть написан ваш код

  const burgerBtn = document.querySelector('.burger');
  const mainNav = document.querySelector('.main-nav');
  const catalog = document.querySelector('.catalog__books-list');

  burgerBtn.addEventListener('click', openMenu);

  function openMenu() {
    mainNav.classList.toggle('main-nav--open');
    burgerBtn.classList.toggle('burger--close');
  };

  const filterToggle = document.querySelector('.filters__trigger');
  const filterMenu = document.querySelector('.filters');

  filterToggle.addEventListener('click', openFilter);

  function openFilter() {
    filterMenu.classList.toggle('filters--open');
  };

  const template = document.querySelector('#book-template');
  const fragment = document.createDocumentFragment();

  for (i=0; i < 10; i++) {
    const bookTemplate = template.content.cloneNode(true);

    bookTemplate.querySelector('.card__title').innerHTML = books[i].name;
    bookTemplate.querySelector('.card__price').innerHTML = books[i].price + ' ₽';
    bookTemplate.querySelector('.card__img').src = 'img/books/' + books[i].uri + '.jpg';

    fragment.appendChild(bookTemplate);
  };

  catalog.appendChild(fragment);

// Отслеживаем событие (отправки формы)

  const filtersForm = document.forms.filter;

  filtersForm.addEventListener('submit', function (e) {
    e.preventDefault();
    filterPrice();
    // renderCards();
  });


// функция принимающая массив, применяем .filter, записываем в новый массив

  function generateFilters () {
    let bookName = filtersForm.elements['book-name'];

    bookName.addEventListener('input', () => {
      let filteredBookName = books.filter(item => {
        let re = new RegExp(bookName.value, `gi`)

        return re.test(item.name);
      });
      console.log(filteredBookName)
    });
  };

  generateFilters();

  function filterPrice () {
    let minPrice = filtersForm.elements['price-from'].value;
    let maxPrice = filtersForm.elements['price-to'].value;
    let filterArrPrice = books.filter(function (el) {
      return el.price >= minPrice &&
             el.price < maxPrice;
    });

    console.log(filterArrPrice);

      function renderCards () {
        catalog.innerHTML = ' ';
        filterArrPrice.forEach(function (item) {
          const bookTemplate = template.content.cloneNode(true);

          bookTemplate.querySelector('.card__title').innerHTML = item.name;
          bookTemplate.querySelector('.card__price').innerHTML = item.price + ' ₽';
          bookTemplate.querySelector('.card__img').src = 'img/books/' + item.uri + '.jpg';

          fragment.appendChild(bookTemplate);
        });
      catalog.appendChild(fragment);
      }
    renderCards();
  }

// выводим результат в .catalog__books-list





  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}