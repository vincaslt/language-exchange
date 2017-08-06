declare module '*.jpg' {
  const value: any
  export = value
}

// TODO: remove when definitely types is merged
declare module 'react-notification-system-redux' {
  import { Component } from 'react';
  import { Action } from 'redux';
  import { Attributes, Notification } from 'react-notification-system';

  export as namespace Notifications;

  export = Notifications;

  declare class Notifications extends Component<Notifications.NotificationsProps> { }

  declare namespace Notifications {
    type NotificationsState = Notification[];

    type NotificationLevel = 'error' | 'warning' | 'info' | 'success';

    type NotificationsReducer<A extends Action> = (state: NotificationsState, action: A) => NotificationsState;

    type NotificationShow = (opts?: Notification) => Action;

    interface NotificationsProps extends Attributes {
      notifications?: Notification[];
    }

    const reducer: NotificationsReducer<any>;

    function show(opts?: Notification, level?: NotificationLevel): Action;
    const error: NotificationShow;
    function hide(opts?: Notification | string | number): Action;
    const info: NotificationShow;
    const success: NotificationShow;
    const warning: NotificationShow;
    function removeAll(): Action;
  }
}