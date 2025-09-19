import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isGroup?: boolean;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
};

const VipMinApp = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Анна Смирнова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5a0?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Команда проекта',
      lastMessage: 'Встреча завтра в 10:00',
      time: '13:45',
      unread: 5,
      isGroup: true,
    },
    {
      id: '3',
      name: 'Михаил Петров',
      lastMessage: 'Отправил файлы',
      time: 'Вчера',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
  ]);

  const [groups] = useState<Chat[]>([
    {
      id: 'g1',
      name: 'Разработчики',
      lastMessage: 'Новая версия готова!',
      time: '15:20',
      unread: 3,
      isGroup: true,
    },
    {
      id: 'g2',
      name: 'Дизайнеры',
      lastMessage: 'Макеты обновлены',
      time: '12:15',
      unread: 1,
      isGroup: true,
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: 'c1',
      name: 'Анна Смирнова',
      email: 'anna@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5a0?w=100&h=100&fit=crop&crop=face',
      isOnline: true,
    },
    {
      id: 'c2',
      name: 'Михаил Петров',
      email: 'mikhail@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isOnline: false,
    },
  ]);

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  const renderChatItem = (chat: Chat, onDelete?: (id: string) => void) => (
    <Card key={chat.id} className="p-3 mb-2 hover:bg-vip-gray-50 transition-colors cursor-pointer animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={chat.avatar} />
            <AvatarFallback className="bg-vip-blue text-white font-sf-pro">
              {chat.isGroup ? (
                <Icon name="Users" size={20} />
              ) : (
                chat.name.split(' ').map(n => n[0]).join('')
              )}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-sf-pro font-semibold text-vip-gray-900 truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-vip-gray-500 ml-2">{chat.time}</span>
            </div>
            <p className="text-sm text-vip-gray-600 truncate mt-1">
              {chat.lastMessage}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
          {chat.unread > 0 && (
            <Badge className="bg-vip-red text-white text-xs min-w-[20px] h-5 flex items-center justify-center animate-bounce-gentle">
              {chat.unread}
            </Badge>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chat.id);
              }}
              className="text-vip-red hover:bg-vip-red hover:text-white"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  const renderContactItem = (contact: Contact) => (
    <Card key={contact.id} className="p-3 mb-2 hover:bg-vip-gray-50 transition-colors cursor-pointer animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback className="bg-vip-purple text-white font-sf-pro">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {contact.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-vip-green rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-sf-pro font-semibold text-vip-gray-900 truncate">
            {contact.name}
          </h3>
          <p className="text-sm text-vip-gray-600 truncate">
            {contact.email}
          </p>
        </div>
        
        <Button variant="ghost" size="sm" className="text-vip-blue">
          <Icon name="MessageCircle" size={20} />
        </Button>
      </div>
    </Card>
  );

  const navigationItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle', count: chats.filter(c => c.unread > 0).length },
    { id: 'groups', label: 'Группы', icon: 'Users', count: groups.filter(g => g.unread > 0).length },
    { id: 'contacts', label: 'Контакты', icon: 'UserPlus', count: 0 },
    { id: 'profile', label: 'Профиль', icon: 'User', count: 0 },
    { id: 'settings', label: 'Настройки', icon: 'Settings', count: 0 },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell', count: 7 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vip-gray-50 to-vip-gray-100 font-sf-pro">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-vip-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-vip-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-vip-gray-900">VIP Min</h1>
                <p className="text-sm text-vip-gray-600">Современный мессенджер</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-vip-gray-600">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-vip-gray-600">
                <Icon name="Plus" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold text-vip-gray-900 mb-4">Навигация</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-vip-blue text-white shadow-md transform scale-105'
                        : 'text-vip-gray-700 hover:bg-vip-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item.icon as any} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count > 0 && (
                      <Badge className="bg-vip-red text-white text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Search Bar */}
              <Card className="p-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-400" />
                  <Input 
                    placeholder="Поиск чатов, групп и контактов..."
                    className="pl-10 pr-4 py-3 border-vip-gray-200 focus:border-vip-blue focus:ring-vip-blue"
                  />
                </div>
              </Card>

              {/* Content Area */}
              <Card className="p-6">
                {activeTab === 'chats' && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-vip-gray-900">Чаты</h2>
                      <Button className="bg-vip-blue hover:bg-vip-purple text-white">
                        <Icon name="Plus" size={20} className="mr-2" />
                        Новый чат
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {chats.length > 0 ? (
                        chats.map(chat => renderChatItem(chat, deleteChat))
                      ) : (
                        <div className="text-center py-12">
                          <Icon name="MessageCircle" size={48} className="mx-auto text-vip-gray-300 mb-4" />
                          <p className="text-vip-gray-500">У вас пока нет чатов</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'groups' && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-vip-gray-900">Группы</h2>
                      <Button className="bg-vip-purple hover:bg-vip-blue text-white">
                        <Icon name="Users" size={20} className="mr-2" />
                        Создать группу
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {groups.map(group => renderChatItem(group))}
                    </div>
                  </div>
                )}

                {activeTab === 'contacts' && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-vip-gray-900">Контакты</h2>
                      <Button className="bg-vip-green hover:bg-vip-teal text-white">
                        <Icon name="UserPlus" size={20} className="mr-2" />
                        Добавить контакт
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {contacts.map(contact => renderContactItem(contact))}
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-vip-gray-900 mb-6">Профиль</h2>
                    <div className="text-center py-8">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarFallback className="bg-vip-gradient text-white text-2xl">
                          У
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-vip-gray-900 mb-2">Пользователь</h3>
                      <p className="text-vip-gray-600 mb-6">user@example.com</p>
                      <Button className="bg-vip-blue hover:bg-vip-purple text-white">
                        Редактировать профиль
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-vip-gray-900 mb-6">Настройки</h2>
                    <div className="space-y-4">
                      <Card className="p-4">
                        <h3 className="font-semibold text-vip-gray-900 mb-2">Уведомления</h3>
                        <p className="text-vip-gray-600">Настройка уведомлений о сообщениях</p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold text-vip-gray-900 mb-2">Приватность</h3>
                        <p className="text-vip-gray-600">Управление настройками приватности</p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold text-vip-gray-900 mb-2">Тема</h3>
                        <p className="text-vip-gray-600">Выбор темы оформления</p>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-vip-gray-900 mb-6">Уведомления</h2>
                    <div className="space-y-3">
                      {[
                        { text: 'Новое сообщение от Анны', time: '2 мин назад', type: 'message' },
                        { text: 'Вас добавили в группу "Проект"', time: '5 мин назад', type: 'group' },
                        { text: 'Михаил отправил файл', time: '10 мин назад', type: 'file' },
                        { text: 'Пропущенный звонок от Анны', time: '15 мин назад', type: 'call' },
                      ].map((notification, index) => (
                        <Card key={index} className="p-4 hover:bg-vip-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-vip-blue rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-vip-gray-900">{notification.text}</p>
                              <p className="text-sm text-vip-gray-500">{notification.time}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipMinApp;