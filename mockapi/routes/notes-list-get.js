
module.exports = function (params, res) {
  const notes = [
    {
      id: 0,
      background: 'isCyan',
      title: 'Notes',
      trash: false,
      rows: [
        {
          id: 0,
          text: 'Sidebar',
          checked: true
        },
        {
          id: 1,
          text: 'Вставка новых строк',
          checked: true
        },
        {
          id: 2,
          text: 'Вставка новых карточек',
          checked: true
        },
        {
          id: 3,
          text: 'Удаление строк',
          checked: true
        },
        {
          id: 4,
          text: 'Удаление карточек',
          checked: true
        },
        {
          id: 5,
          text: 'Держать статус в store',
          checked: true
        },
        {
          id: 6,
          text: 'Анимация',
          checked: true
        },
        {
          id: 7,
          text: 'Фокус на новой строке',
          checked: true
        },
        {
          id: 8,
          text:
            'Уникальные ключи для notes, для rows (БАГ с анимацией isChecked)',
          checked: true
        },
        {
          id: 10,
          text: 'Изменение цвета фона',
          checked: true
        },
        {
          id: 12312,
          text: 'SVG-компоненты',
          checked: true
        },
        {
          id: 9,
          text: 'Заголовки',
          checked: true
        },
        {
          id: 911,
          text: 'Заголовки (БАГИ проверить)',
          checked: true
        },
        {
          id: 34672836487234,
          text: 'isFocused (БАГИ проверить)',
          checked: true
        },
        {
          id: 211233112132424322321312312321321,
          text: 'Доделать стили для placeholder',
          checked: true
        },
        {
          id: 213441121324243223213123123,
          text: 'Получение данных из API',
          checked: true
        },
        {
          id: 2123211311432132424322321312312312321,
          text: 'Добавление карточек в корзину',
          checked: true
        },
        {
          id: 21231121324,
          text: 'new set unique id',
          checked: true
        },
        {
          id: 2123112132424322321312312312321,
          text: 'Сделать страницу корзины',
          checked: true
        },
        {
          id: 213123213123123,
          text: 'max-height для карточек',
          checked: true
        },
        {
          id: 777777,
          text: 'Обработка ошибок при потере соединения (localStorage итд)',
          checked: false
        },
        {
          id: 13,
          text: 'Хранение данных в MongoDb',
          checked: false
        },
        {
          id: 1311223344,
          text: 'Авторизация',
          checked: false
        },
        {
          id: 11,
          text: 'Вёрстка на ГРИДАХ',
          checked: true
        },
        {
          id: 121212,
          text: 'sticky шапка (для корзины тоже)',
          checked: true
        },
        {
          id: 12,
          text: 'Мобильный интерфейс',
          checked: true
        },
        {
          id: 15,
          text: 'Оповещения об удалении и возможности вернуть изменения',
          checked: false
        },
        {
          id: 151515,
          text: 'Очистить корзину (и текст для пустой корзины)',
          checked: false
        },
        {
          id: 14,
          text: '(Необязательно) Оповещения о сохраненных изменениях',
          checked: true
        }
      ]
    },
    {
      id: 1,
      background: 'isGreen',
      title: 'Graphs',
      trash: false,
      rows: [
        {
          id: 213121,
          text: 'https://www.youtube.com/watch?v=U33dsEcKgeQ',
          checked: false
        },
        {
          id: 1,
          text: 'Рандом рисование',
          checked: true
        },
        {
          id: 1232132131,
          text: 'Баги рандома: 1 - не должно быть обособленных линий',
          checked: true
        },
        {
          id: 1232132112321331,
          text: 'Баги рандома: 3 - проверить циклы',
          checked: true
        },
        {
          id: 123123123123213,
          text: 'Вычисление value у кружков',
          checked: true
        },
        {
          id: 0,
          text: 'Анимация',
          checked: true
        },
        {
          id: 374747264937463,
          text:
            'Баг текста в канвасе: при загрузке странице изначально отрисован неправильный шрифт',
          checked: false
        },
        {
          id: 1212111111132132131,
          text:
            'Баги рандома: 2 - линии не должны сливаться и круги не стояли на одной линии',
          checked: false
        },
        {
          id: 499999992399329329,
          text: 'Добавление данных в URL страницы',
          checked: false
        },
        {
          id: 4,
          text: 'Несколько шагов игры (типа турнира)',
          checked: false
        },
        {
          id: 5,
          text: 'Визуальный бар для шагов (как в бутстрапе)',
          checked: false
        },
        {
          id: 6,
          text:
            'Прошлые результаты из/в localstorage или БД (результаты всех игроков)',
          checked: false
        },
        {
          id: 2,
          text: 'Адаптив',
          checked: false
        },
        {
          id: 3,
          text: 'Ресайз',
          checked: false
        }
      ]
    },
    {
      id: 2,
      background: '',
      title: 'Webpack 4 frontend scaffolding',
      trash: false,
      rows: [
        {
          id: 0,
          text: 'Разобраться с sass-loader',
          checked: true
        },
        {
          id: 213211,
          text: 'JSON Server',
          checked: true
        },
        {
          id: 1,
          text: 'Минификация всего',
          checked: true
        },
        {
          id: 2132131,
          text: 'SVG-спрайт для Gulp',
          checked: true
        }
      ]
    },
    {
      id: 3,
      background: '',
      title: 'Карточка из корзины',
      trash: true,
      rows: []
    },
    {
      id: 4,
      background: '',
      title: 'Карточка из корзины',
      trash: true,
      rows: []
    }
  ]

  res.jsonp({
    notes
  })
}
