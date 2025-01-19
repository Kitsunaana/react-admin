interface ISidebar {
  catalog: string;
  goods: string;
  additions: string;
  stopList: string;
  pricing: string;
  priceList: string;
  promoCode: string;
  order: string;
  newOrder: string;
  clients: string;
  analysis: string;
  chat: string;
  favorite: string;
  users: string;
  settings: string;
  notAvailable: string;
  collapseRoutes: string;
  expandRoutes: string;
}

interface ISettings {
  changeLanguage: string;
  changeTheme: string;
  themes: {
    dark: string;
    system: string;
    light: string;
  };
  changeIconThickness: string;
  changeFillIcons: string;
  iconSettings: string;
}

interface IGlobalConfirm {
  title: string;
  description: string;
  confirmText: string;
  closeText: string;
}

interface IGlobalForms {
  clear: string;
  validate: {
    required: string;
    minLength: string;
    requiredSelect: string;
  };
}

interface IGlobalDialog {
  copy: string;
  paste: string;
  copySettings: string;
  fullscreenOpen: string;
  fullscreenClose: string;
  save: string;
  cancel: string;
  clear: string;
  confirm: {
    close: {
      close: string;
      cancel: string;
      descriptionClose: string;
    };
    save: {
      save: string;
      cancel: string;
      descriptionSave: string;
    };
    keyboard: {
      ok: string;
      close: string;
    };
  };
}

interface IGlobal {
  listEmpty: string;
  confirm: IGlobalConfirm;
  forms: IGlobalForms;
  dialog: IGlobalDialog;
}

interface ITag {
  rows: {
    edit: string;
    delete: string;
  };
  actions: {
    add: string;
  };
  dialog: {
    title: {
      edit: string;
      create: string;
    };
    forms: {
      tag: string;
      icon: string;
      color: string;
    };
  };
  confirm: {
    remove: {
      confirm: string;
      description: string;
    };
  };
}

interface IAltName {
  confirm: {
    remove: {
      confirm: string;
      description: string;
    };
  };
  actions: {
    add: string;
    translate: string;
  };
  rows: {
    edit: string;
    delete: string;
  };
  dialog: {
    forms: {
      locale: string;
      caption: string;
      description: string;
    };
    title: {
      create: string;
      edit: string;
    };
  };
}

interface ICatalogTop {
  search: string;
  refresh: string;
  add: string;
  back: string;
}

interface ICatalogRows {
  goodsCategoryCount: string;
  moveUp: string;
  moveDown: string;
  addStopList: string;
  actions: string;
  menuActions: {
    edit: string;
    goodsCategory: string;
    additional: string;
    addStopList: string;
    delete: string;
  };
}

interface ICatalogBottom {
  count: string;
}

interface ICatalogConfirm {
  remove: {
    description: string;
    confirm: string;
  };
  clear: {
    description: string;
    confirm: string;
  };
}

interface ICatalogDialogNotify {
  copyError: string;
  copySuccess: string;
  pasteSuccess: string;
  pasteError: string;
}

interface ICatalogDialogNotifyCreate {
  pending: string;
  error: string;
  success: string;
  imagePending: string;
  imageError: string;
}

interface ICatalogDialogNotifyEdit {
  pending: string;
  error: string;
  success: string;
  imagePending: string;
  imageError: string;
}

interface ICatalogDialogNotifyRemove {
  error: string;
  success: string;
}

interface ICatalogDialogNotifySettings {
  none: string;
  add: string;
  replace: string;
  tabs: {
    rows: string;
    fields: string;
  };
  rows: {
    images: string;
    characteristics: string;
    tags: string;
  };
  fields: {
    activeImageId: string;
    bgColor: string;
    blur: string;
    caption: string;
    captionPosition: string;
    color: string;
    description: string;
    isShowPhotoWithGoods: string;
  };
}

interface ICatalogDialogTitle {
  edit: string;
  create: string;
}

interface ICatalogDialogTabs {
  common: string;
  photo: string;
  photoPosition: string;
  characteristics: string;
  alternativeNames: string;
  tags: string;
}

interface ICatalogDialogForms {
  caption: string;
  description: string;
  images: string;
  moveUp: string;
  moveDown: string;
  displayAccordingCreationDate: string;
  showPhotoInListGoods: string;
  bgColor: string;
  textColor: string;
  effectBlur: string;
  clear: string;
}

interface ICatalog {
  top: ICatalogTop;
  rows: ICatalogRows;
  bottom: ICatalogBottom;
  confirm: ICatalogConfirm;
  dialog: {
    history: string;
    undo: string;
    redo: string;
    notify: ICatalogDialogNotify;
    create: ICatalogDialogNotifyCreate;
    edit: ICatalogDialogNotifyEdit;
    remove: ICatalogDialogNotifyRemove;
    settings: ICatalogDialogNotifySettings;
    title: ICatalogDialogTitle;
    tabs: ICatalogDialogTabs;
    forms: ICatalogDialogForms;
    positionInContainer: string;
  };
}

interface ICharacteristic {
  confirm: {
    remove: {
      description: string;
      confirm: string;
    };
  };
  rows: {
    forCategory: string;
    edit: string;
    delete: string;
    hiddenForClient: string;
  };
  actions: {
    add: string;
  };
  dialog: {
    title: {
      create: string;
      edit: string;
      delete: string;
    };
    forms: {
      caption: string;
      unit: string;
      value: string;
      hideClient: string;
    };
  };
}

interface ITranslate {
  sidebar: ISidebar;
  settings: ISettings;
  global: IGlobal;
  tag: ITag;
  altName: IAltName;
  catalog: ICatalog;
  characteristic: ICharacteristic;
}

export interface ILanguageTranslate {
  ru: ITranslate;
  en: ITranslate;
}
