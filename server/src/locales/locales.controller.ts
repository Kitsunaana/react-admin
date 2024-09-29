import { Controller, Get, Param } from '@nestjs/common';
import { LocalesService } from './locales.service';

const translate = {
  en: {
    global: {
      forms: {
        validate: {
          required: 'This field is required',
          minLength: 'Minimum number of characters {{value}}',
          requiredSelect: 'The value must be selected',
        },
        clear: 'Clear',
      },
      listEmpty: 'The list is empty',
      dialog: {
        copy: 'Copy data for transfer',
        paste: 'Download copied data',
        copySettings: 'Settings for pasting copied data',
        fullscreenOpen: 'Expand to full screen',
        fullscreenClose: 'Collapse window',
        save: 'Save',
        cancel: 'Cancel',
      },
    },
    tag: {
      dialog: {
        title: {
          delete: 'Delete',
          edit: 'Editing a Tag <strong>{{value}}</strong>',
          create: 'Creating a tag',
        },
        forms: {
          tag: 'Tag',
          icon: 'Icon',
          color: 'Color',
        },
      },
    },
    altNames: {
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
          caption: 'Name',
          description: 'Description',
        },
      },
    },
    catalog: {
      top: {
        search: 'Search',
        refresh: 'Update',
        add: 'Create',
        back: 'Go back',
      },
      rows: {
        goodsCategoryCount: 'Number of products in category',
        moveUp: 'Move higher',
        moveDown: 'Move below',
        addStopList: 'Add to stop list',
        actions: 'Actions',
        menuActions: {
          edit: 'Edit',
          goodsCategory: 'Products category',
          additional: 'Add-ons',
          addStopList: 'Add to stop list',
          delete: 'Delete',
        },
      },
      bottom: {
        count: 'Total <strong>{{value}}</strong> elements',
      },
      dialog: {
        copySettings: {
          tabs: {
            rows: 'Filled rows',
            inputs: 'Input fields',
          },
          rows: {
            images: 'Photos',
            characteristics: 'Characteristics',
            tags: 'Tags',
          },
          inputs: {
            activeImageId: 'Selected image',
            bgColor: 'Background color for text',
            blur: 'Glass background effect',
            caption: 'Name',
            captionPosition: 'Position of text on photo',
            color: 'Text color',
            description: 'Description',
            isShowPhotoWithGoods: 'Show photos in the list of products as a section',
          },
        },
        title: {
          edit: 'Editing a category <strong>{{value}}</strong>',
          create: 'Creating a category',
        },
        tabs: {
          common: 'General settings',
          photo: 'Photo',
          photoPosition: 'Position of text on photo',
          characteristics: 'Characteristics',
          alternativeNames: 'Alternative names',
          tags: 'Tags',
        },
        forms: {
          caption: 'Name',
          description: 'Description',
          images: 'Select image',
          moveUp: 'Move higher',
          moveDown: 'Move bellow',
          displayAccordingCreationDate: 'Display according to creation sequence',
          showPhotoInListGoods: 'Show photos in the list of products as a section',
          bgColor: 'Background color for text',
          textColor: 'Text color',
          effectBlur: 'Glass background effect',
          clear: 'Delete image',
        },
        positionInContainer: 'Positioning in a container',
      },
    },
    characteristic: {
      rows: {
        forCategory: 'For category',
        edit: 'Edit',
        delete: 'Delete',
        hiddenForClient: 'Hide from user',
      },
      actions: {
        add: 'Create',
      },
      dialog: {
        title: {
          create: 'Creating a characteristic',
          edit: 'Edit characteristic <strong>{{value}}</strong>',
          delete: 'Delete characteristic <strong>{{value}}</strong>',
        },
        forms: {
          caption: 'Name',
          unit: 'Units of measurement',
          value: 'Value',
          hideClient: 'Hide from client',
        },
      },
    },
  },
  ru: {
    global: {
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
      },
    },
    tag: {
      dialog: {
        title: {
          delete: 'Удалить',
          edit: 'Редактирование тега <strong>{{value}}</strong>',
          create: 'Создании тега',
        },
        forms: {
          tag: 'Тег',
          icon: 'Иконка',
          color: 'Цвет',
        },
      },
    },
    altNames: {
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
      },
    },
    catalog: {
      notify: {
        find: {
          success: 'Категория <strong>{{value}}</strong> найдена',
          pending: 'Категория <strong>{{value}}</strong> загружается',
          error: 'При поиске категории <strong>{{value}}</strong> произошла ошибка',
        },
        edit: {
          success: 'Категория <strong>{{value}}</strong> обновлена',
          pending: '',
          error: '',
        },
        create: {
          success: '',
          pending: '',
          error: '',
        },
      },
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
      dialog: {
        copySettings: {
          tabs: {
            rows: 'Заполняемые строки',
            inputs: 'Поля ввода',
          },
          rows: {
            images: 'Фотографии',
            characteristics: 'Характеристики',
            tags: 'Теги',
          },
          inputs: {
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

@Controller('api/locales')
export class LocalesController {
  constructor(private localeService: LocalesService) {}

  @Get('/:lng')
  getLanguage(@Param() { lng }: { lng: string }) {
    return translate[lng];
  }

  @Get('')
  getAll() {
    return this.localeService.getAll();
  }
}
