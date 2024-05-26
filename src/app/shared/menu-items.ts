import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard' },
  {
    state: 'sales',
    name: 'Ventas',
    type: 'link',
    icon: 'real_estate_agent',
  },
  {
    state: 'incomes',
    name: 'Ingresos',
    type: 'link',
    icon: 'payments',
  },
  {
    state: 'publicaciones',
    name: 'Publicaciones',
    type: 'link',
    icon: 'auto_awesome_motion',
  },
  {
    state: 'live',
    name: 'Directas',
    type: 'link',
    icon: 'cast',
  },
  {
    state: 'canal',
    name: 'Canales',
    type: 'link',
    icon: 'subscriptions',
  },
  {
    state: 'playlist',
    name: 'Listas',
    type: 'link',
    icon: 'list',
  },

  {
    state: 'comentarios',
    name: 'Comentarios',
    type: 'link',
    icon: 'forum',
  },
  {
    state: 'series',
    name: 'Series',
    type: 'link',
    icon: 'video_library',
  },
  {
    state: 'temporadas',
    name: 'Temporadas',
    type: 'link',
    icon: 'library_add_check',
  },
  {
    state: 'events',
    name: 'Eventos',
    type: 'link',
    icon: 'calendar_month',
  },
  {
    state: 'denuncias',
    name: 'Denuncias',
    type: 'link',
    icon: 'warning',
  },
  {
    state: 'solicitud',
    name: 'Solicitud',
    type: 'link',
    icon: 'person_add',
  },
  {
    state: 'solicitud-canal',
    name: 'Solicitud de Canal',
    type: 'link',
    icon: 'playlist_add',
  },
  {
    state: 'votes',
    name: 'Votos',
    type: 'link',
    icon: 'thumbs_up_down',
  },
  {
    state: 'logs',
    name: 'Logs',
    type: 'link',
    icon: 'history',
  },
  {
    state: 'faqs',
    name: 'FAQ',
    type: 'link',
    icon: 'quiz',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
