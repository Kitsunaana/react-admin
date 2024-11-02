export const translate = {
  en: {
    sidebar: {
      catalog: 'Catalog',
      goods: 'Products',
      additions: 'Additions',
      stopList: 'Stop list',
      pricing: 'Pricing',
      priceList: 'Price list',
      promoCode: 'Promo codes',
      order: 'Orders',
      newOrder: 'New order',
      clients: 'Clients',
      analysis: 'Analysis',
      chat: 'Chat',
      favorite: 'Favorites',
      users: 'Users',
      settings: 'Settings',
      notAvailable: 'Not available yet',
      collapseRoutes: 'Collapse',
      expandRoutes: 'Expand',
    },
    settings: {
      notify: {
        errorValidate:
          'The <strong>{{value}}</strong> settings in localStorage are incorrectly specified',
        infoNotFound:
          'Settings for <strong>{{value}}</strong> were not found, default settings are used',
        errorParsed: 'The <strong>{{value}}</strong> data for parsing is corrupted',
      },
      changeLanguage: 'Select language',
      changeTheme: 'Color theme',
      themes: {
        dark: 'Dark',
        system: 'System',
        light: 'Light',
      },
      changeIconThickness: 'Icon thickness',
      changeFillIcons: 'Icon fill',
      iconSettings: 'Icon settings',
    },
    global: {
      confirm: {
        title: 'Confirm action',
        description: 'Are you sure you want to continue?',
        confirmText: 'Confirm',
        closeText: 'Cancel',
      },
      forms: {
        validate: {
          required: 'Required field',
          minLength: 'Minimum number of characters {{value}}',
          requiredSelect: 'Value must be selected',
        },
        clear: 'Clear',
      },
      listEmpty: 'List empty',
      dialog: {
        copy: 'Copy data for transfer',
        paste: 'Load copied data',
        copySettings: 'Settings for pasting copied data',
        fullscreenOpen: 'Expand to full screen',
        fullscreenClose: 'Minimize window',
        save: 'Save',
        cancel: 'Cancel',
        clear: 'Clear form',
      },
    },
    tag: {
      rows: {
        edit: 'Edit',
        delete: 'Delete',
      },
      actions: {
        add: 'Create',
      },
      dialog: {
        title: {
          edit: 'Editing tag <strong>{{value}}</strong>',
          create: 'Creating tag',
        },
        forms: {
          tag: 'Tag',
          icon: 'Icon',
          color: 'Color',
        },
      },
      confirm: {
        remove: {
          confirm: 'Yes, delete',
          description: 'Are you sure you want to delete tag <strong>{{value}}</strong>',
        },
      },
    },
    altNames: {
      confirm: {
        remove: {
          confirm: 'Yes, delete',
          description:
            'Are you sure you want to delete the alternative name <strong>{{value}}</strong>',
        },
      },
      actions: {
        add: 'Create',
        translate: 'Translate',
      },
      rows: {
        edit: 'Edit',
        delete: 'Delete',
      },
      dialog: {
        forms: {
          locale: 'Language',
          caption: 'Title',
          description: 'Description',
        },
        title: {
          create: 'Create alternative name',
          edit: 'Edit alternative name <strong>{{value}}</strong>',
        },
      },
    },
    catalog: {
      top: {
        search: 'Search',
        refresh: 'Refresh',
        add: 'Create',
        back: 'Go back',
      },
      rows: {
        goodsCategoryCount: 'Number of products in category',
        moveUp: 'Move up',
        moveDown: 'Move down',
        addStopList: 'Add to stop list',
        actions: 'Actions',
        menuActions: {
          edit: 'Edit',
          goodsCategory: 'Products in category',
          additional: 'Additions',
          addStopList: 'Add to stop list',
          delete: 'Delete',
        },
      },
      bottom: {
        count: 'Total <strong>{{value}}</strong> items',
      },
      confirm: {
        remove: {
          description: 'Are you sure you want to delete category <strong>{{value}}</strong>',
          confirm: 'Yes, delete',
        },
        clear: {
          description: 'Are you sure you want to clear all filled data about the category',
          confirm: 'Yes, clear',
        },
      },
      dialog: {
        notify: {
          copyError: 'An error occurred while copying data',
          copySuccess: 'Data for transfer copied',
          pasteSuccess: 'Data successfully pasted',
          pasteError: 'Invalid data for pasting',
        },
        create: {
          pending: 'Creating category',
          error: 'An error occurred while creating category',
          success: 'Category added',
          imagePending: 'Loading images',
          imageError: 'An error occurred while loading images',
        },
        edit: {
          pending: 'Category updating',
          error: 'An error occurred while updating category',
          success: 'Category updated',
          imagePending: 'Loading images',
          imageError: 'An error occurred while loading images',
        },
        remove: {
          remove: 'An error occurred while deleting the category',
          success: 'The category was deleted successfully',
        },
        settings: {
          none: 'Do not change',
          add: 'Adding',
          replace: 'Replacing',
          tabs: {
            rows: 'Rows to fill',
            fields: 'Input fields',
          },
          rows: {
            images: 'Photos',
            characteristics: 'Characteristics',
            tags: 'Tags',
          },
          fields: {
            activeImageId: 'Selected image',
            bgColor: 'Background color for text',
            blur: 'Background glass effect',
            caption: 'Title',
            captionPosition: 'Position of text on photo',
            color: 'Text color',
            description: 'Description',
            isShowPhotoWithGoods: 'Show photos in the list with goods as a section',
          },
        },
        title: {
          edit: 'Edit category <strong>{{value}}</strong>',
          create: 'Create category',
        },
        tabs: {
          common: 'General parameters',
          photo: 'Photo',
          photoPosition: 'Position of text on photo',
          characteristics: 'Characteristics',
          alternativeNames: 'Alternative names',
          tags: 'Tags',
        },
        forms: {
          caption: 'Title',
          description: 'Description',
          images: 'Select image',
          moveUp: 'Move up',
          moveDown: 'Move down',
          displayAccordingCreationDate: 'Display according to creation order',
          showPhotoInListGoods: 'Show photos in the product list as a section',
          bgColor: 'Background color for text',
          textColor: 'Text color',
          effectBlur: 'Background glass effect',
          clear: 'Remove image',
        },
        positionInContainer: 'Positioning in container',
      },
    },
    characteristic: {
      confirm: {
        remove: {
          description: 'Do you really want to delete the <strong>{{value}}</strong> characteristic',
          confirm: 'Yes, delete',
        },
      },
      rows: {
        forCategory: 'For category',
        edit: 'Edit',
        delete: 'Delete',
        hiddenForClient: 'Hide for user',
      },
      actions: {
        add: 'Create',
      },
      dialog: {
        title: {
          create: 'Create a characteristic',
          edit: 'Edit characteristic <strong>{{value}}</strong>',
          delete: 'Delete characteristic <strong>{{value}}</strong>',
        },
        forms: {
          caption: 'Title',
          unit: 'Units of measurement',
          value: 'Value',
          hideClient: 'Hide from client',
        },
      },
    },
  },
  ru: {
    sidebar: {
      catalog: 'Каталог',
      goods: 'Товары',
      additions: 'Дополнения',
      stopList: 'Стоп-лист',
      pricing: 'Ценообразование',
      priceList: 'Прайс-лист',
      promoCode: 'Промокоды',
      order: 'Заказы',
      newOrder: 'Новый заказ',
      clients: 'Клиенты',
      analysis: 'Анализ',
      chat: 'Чат',
      favorite: 'Избранное',
      users: 'Пользователи',
      settings: 'Настройки',
      notAvailable: 'Пока не доступно',
      collapseRoutes: 'Свернуть',
      expandRoutes: 'Развернуть',
    },
    settings: {
      notify: {
        errorValidate: 'Не правильно указаны настройки <strong>{{value}}</strong> в localStorage',
        infoNotFound:
          'Настройки для <strong>{{value}}</strong> не найдены, ' +
          'используется параметры по умолчанию',
        errorParsed: 'Данные <strong>{{value}}</strong> для парсинга повреждены',
      },
      changeLanguage: 'Выбирете язык',
      changeTheme: 'Цветовая тема',
      themes: {
        dark: 'Темная',
        system: 'Системная',
        light: 'Светлая',
      },
      changeIconThickness: 'Толщина иконок',
      changeFillIcons: 'Заполнение иконок',
      iconSettings: 'Настройки иконок',
    },
    global: {
      confirm: {
        title: 'Подтвердите действие',
        description: 'Вы уверены, что хотите продолжить?',
        confirmText: 'Подтвердить',
        closeText: 'Отмена',
      },
      forms: {
        validate: {
          required: 'Поле обязательно для заполнения',
          minLength: 'Минимальное количество символов {{value}}',
          requiredSelect: 'Значение должно быть выбрано',
        },
        clear: 'Очистить',
      },
      listEmpty: 'Список пуст',
      dialog: {
        copy: 'Скопировать данные для переноса',
        paste: 'Загрузить скопированные данные',
        copySettings: 'Настройки вставки скопированных данных',
        fullscreenOpen: 'Развернуть на весь экран',
        fullscreenClose: 'Свернуть окно',
        save: 'Сохранить',
        cancel: 'Отменить',
        clear: 'Очистить форму',

        confirm: {
          close: {
            close: 'Закрыть',
            cancel: 'Отмена',
            descriptionClose: 'Вы уверены, что хотите закрыть диалоговое окно',
          },
          save: {
            save: 'Сохранить',
            cancel: 'Отменить',
            descriptionSave: 'Сохрнаить все заполненные данные?',
          },
        },
      },
    },
    tag: {
      rows: {
        edit: 'Редактировать',
        delete: 'Удалить',
      },
      actions: {
        add: 'Создать',
      },
      dialog: {
        title: {
          edit: 'Редактирование тега <strong>{{value}}</strong>',
          create: 'Создании тега',
        },
        forms: {
          tag: 'Тег',
          icon: 'Иконка',
          color: 'Цвет',
        },
      },
      confirm: {
        remove: {
          confirm: 'Да, удалить',
          description: 'Вы действительно хотите удалить тег <strong>{{value}}</strong>',
        },
      },
    },
    altNames: {
      confirm: {
        remove: {
          confirm: 'Да, удалить',
          description:
            'Вы действительно хотите удалить альтернативное название <strong>{{value}}</strong>',
        },
      },
      actions: {
        add: 'Создать',
        translate: 'Перевести',
      },
      rows: {
        edit: 'Редактировать',
        delete: 'Удалить',
      },
      dialog: {
        forms: {
          locale: 'Язык',
          caption: 'Название',
          description: 'Описание',
        },
        title: {
          create: 'Создание альтернативного названия',
          edit: 'Редактирование альтернативного названия <strong>{{value}}</strong>',
        },
      },
    },
    catalog: {
      top: {
        search: 'Поиск',
        refresh: 'Обновить',
        add: 'Создать',
        back: 'Вернуться назад',
      },
      rows: {
        goodsCategoryCount: 'Кол-во товаров категории',
        moveUp: 'Переместить выше',
        moveDown: 'Переместить ниже',
        addStopList: 'Добавить в стоп-лист',
        actions: 'Действия',
        menuActions: {
          edit: 'Редактировать',
          goodsCategory: 'Товары категории',
          additional: 'Дополнения',
          addStopList: 'Добавить в стоп лист',
          delete: 'Удалить',
        },
      },
      bottom: {
        count: 'Всего <strong>{{value}}</strong> элементов',
      },
      confirm: {
        remove: {
          description: 'Вы действительно хотите удалить категорию <strong>{{value}}</strong>',
          confirm: 'Да, удалить',
        },
        clear: {
          description: 'Вы уверены, что хотите очистить все заполненные данные о категории',
          confirm: 'Да, очистить',
        },
      },
      dialog: {
        history: 'История мзменений <strong>{{value}}</strong>',
        undo: 'Отменить <strong>{{value}}</strong>',
        redo: 'Повторить <strong>{{value}}</strong>',
        notify: {
          copyError: 'При копировании данных произошла ошибка',
          copySuccess: 'Данные для перноса скопированы',
          pasteSuccess: 'Данные успешно вставлены',
          pasteError: 'Не валидные данные для вставки',
        },
        create: {
          pending: 'Создается категория',
          error: 'При создании категории произошла ошибка',
          success: 'Категория добавлена',
          imagePending: 'Идет загрузка изображений',
          imageError: 'При загрузке изображений произошла ошибка',
        },
        edit: {
          pending: 'Категория обновляется',
          error: 'При обновлении категории произошла ошибка',
          success: 'Категория обновлена',
          imagePending: 'Идет загрузка изображений',
          imageError: 'При загрузке изображений произошла ошибка',
        },
        remove: {
          remove: 'При удаление категории произошла ошибка',
          success: 'Категория успешно удалена',
        },
        settings: {
          none: 'Не изменять',
          add: 'Добавление',
          replace: 'Замена',
          tabs: {
            rows: 'Заполняемые строки',
            fields: 'Поля ввода',
          },
          rows: {
            images: 'Фотографии',
            characteristics: 'Характеристики',
            tags: 'Теги',
          },
          fields: {
            activeImageId: 'Выбранное изображение',
            bgColor: 'Цвет фона для текста',
            blur: 'Эффект стекла фона',
            caption: 'Название',
            captionPosition: 'Позиция текста на фото',
            color: 'Цвет текста',
            description: 'Описание',
            isShowPhotoWithGoods: 'Показывать фото в списке с товарами как раздел',
          },
        },
        title: {
          edit: 'Редактирование категории <strong>{{value}}</strong>',
          create: 'Создании категории',
        },
        tabs: {
          common: 'Общие параметры',
          photo: 'Фото',
          photoPosition: 'Позиция текста на фото',
          characteristics: 'Характеристики',
          alternativeNames: 'Альтернативиные названия',
          tags: 'Теги',
        },
        forms: {
          caption: 'Название',
          description: 'Описание',
          images: 'Выбрать изображение',
          moveUp: 'Переместить выше',
          moveDown: 'Переместить ниже',
          displayAccordingCreationDate: 'Отображение в соответствие с последовательностью создания',
          showPhotoInListGoods: 'Показывать фото в списке с товарами как раздел',
          bgColor: 'Цвет фона для текста',
          textColor: 'Цвет текста',
          effectBlur: 'Эффект стекла фона',
          clear: 'Удалить изображение',
        },
        positionInContainer: 'Позиционирование в контейнере',
      },
    },
    characteristic: {
      confirm: {
        remove: {
          description: 'Вы действительно хотите удалить характиристику <strong>{{value}}</strong>',
          confirm: 'Да, удалить',
        },
      },
      rows: {
        forCategory: 'Для категории',
        edit: 'Редактировать',
        delete: 'Удалить',
        hiddenForClient: 'Скрыть у пользователя',
      },
      actions: {
        add: 'Создать',
      },
      dialog: {
        title: {
          create: 'Создание характеристики',
          edit: 'Редактировать характеристику <strong>{{value}}</strong>',
          delete: 'Удалить характеристику <strong>{{value}}</strong>',
        },
        forms: {
          caption: 'Название',
          unit: 'Единицы измерения',
          value: 'Значение',
          hideClient: 'Скрыть у клиента',
        },
      },
    },
  },
};
