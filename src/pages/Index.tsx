import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  senderName?: string;
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  isGroup?: boolean;
  messages: Message[];
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
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Анна Смирнова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5a0?w=100&h=100&fit=crop&crop=face',
      messages: [
        { id: 'm1', text: 'Привет! Как дела?', time: '14:30', sender: 'other', senderName: 'Анна' },
        { id: 'm2', text: 'Все отлично! А у тебя?', time: '14:32', sender: 'me' },
        { id: 'm3', text: 'Тоже хорошо! Встретимся завтра?', time: '14:33', sender: 'other', senderName: 'Анна' },
      ]
    },
    {
      id: '2',
      name: 'Команда проекта',
      lastMessage: 'Встреча завтра в 10:00',
      time: '13:45',
      unread: 5,
      isGroup: true,
      messages: [
        { id: 'm4', text: 'Встреча завтра в 10:00', time: '13:45', sender: 'other', senderName: 'Михаил' },
        { id: 'm5', text: 'Отлично, буду!', time: '13:47', sender: 'me' },
        { id: 'm6', text: 'Я тоже приду', time: '13:48', sender: 'other', senderName: 'Анна' },
      ]
    },
    {
      id: '3',
      name: 'Михаил Петров',
      lastMessage: 'Отправил файлы',
      time: 'Вчера',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      messages: [
        { id: 'm7', text: 'Отправил файлы', time: 'Вчера', sender: 'other', senderName: 'Михаил' },
        { id: 'm8', text: 'Спасибо, получил!', time: 'Вчера', sender: 'me' },
      ]
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
      messages: [
        { id: 'gm1', text: 'Новая версия готова!', time: '15:20', sender: 'other', senderName: 'Команда' },
        { id: 'gm2', text: 'Отлично! Где можно скачать?', time: '15:22', sender: 'me' },
      ]
    },
    {
      id: 'g2',
      name: 'Дизайнеры',
      lastMessage: 'Макеты обновлены',
      time: '12:15',
      unread: 1,
      isGroup: true,
      messages: [
        { id: 'gm3', text: 'Макеты обновлены', time: '12:15', sender: 'other', senderName: 'Дизайнер' },
      ]
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

  const selectedChat = chats.find(chat => chat.id === selectedChatId) || 
                      groups.find(group => group.id === selectedChatId);

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

  const openChat = (chatId: string) => {
    setSelectedChatId(chatId);
    // Mark as read
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unread: 0 } : chat
      )
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChatId) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              lastMessage: newMessage,
              time: message.time
            }
          : chat
      )
    );

    setNewMessage('');
  };

  const deleteMessage = (messageId: string) => {
    if (!selectedChatId) return;

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId 
          ? { 
              ...chat, 
              messages: chat.messages.filter(msg => msg.id !== messageId)
            }
          : chat
      )
    );
  };

  const addNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: 'Новый чат',
      lastMessage: 'Чат создан',
      time: 'Сейчас',
      unread: 0,
      messages: []
    };
    setChats([newChat, ...chats]);
  };

  const addNewGroup = () => {
    const newGroup: Chat = {
      id: Date.now().toString(),
      name: 'Новая группа',
      lastMessage: 'Группа создана',
      time: 'Сейчас',
      unread: 0,
      isGroup: true,
      messages: []
    };
    setChats([newGroup, ...chats]);
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = (chat: Chat, onDelete?: (id: string) => void) => (
    <Card 
      key={chat.id} 
      className={`p-3 mb-2 hover:bg-vip-gray-50 transition-colors cursor-pointer animate-fade-in ${
        selectedChatId === chat.id ? 'bg-vip-blue bg-opacity-10 border-vip-blue' : ''
      }`}
      onClick={() => openChat(chat.id)}
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

  const renderMessage = (message: Message) => (
    <div 
      key={message.id}
      className={`flex mb-4 animate-fade-in ${
        message.sender === 'me' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative group ${
          message.sender === 'me' 
            ? 'bg-vip-blue text-white rounded-br-sm' 
            : 'bg-vip-gray-100 text-vip-gray-900 rounded-bl-sm'
        }`}
      >
        {message.sender === 'other' && message.senderName && (
          <div className="text-xs font-semibold text-vip-blue mb-1">
            {message.senderName}
          </div>
        )}
        <div className="text-sm">{message.text}</div>
        <div className={`text-xs mt-1 ${
          message.sender === 'me' ? 'text-white text-opacity-70' : 'text-vip-gray-500'
        }`}>
          {message.time}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteMessage(message.id)}
          className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-vip-red hover:bg-vip-red text-white rounded-full"
        >
          <Icon name="X" size={12} />
        </Button>
      </div>
    </div>
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
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-vip-blue"
          onClick={() => {
            // Create new chat with this contact
            const existingChat = chats.find(chat => chat.name === contact.name);
            if (existingChat) {
              openChat(existingChat.id);
            } else {
              const newChat: Chat = {
                id: Date.now().toString(),
                name: contact.name,
                lastMessage: 'Чат создан',
                time: 'Сейчас',
                unread: 0,
                avatar: contact.avatar,
                messages: []
              };
              setChats([newChat, ...chats]);
              openChat(newChat.id);
            }
            setActiveTab('chats');
          }}
        >
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-vip-gray-600"
                onClick={() => setSearchQuery('')}
              >
                <Icon name="Search" size={20} />
              </Button>
              {selectedChatId && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-vip-gray-600"
                  onClick={() => setSelectedChatId(null)}
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold text-vip-gray-900 mb-4">Навигация</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedChatId(null);
                    }}
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
            {selectedChatId && selectedChat ? (
              // Chat View
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-vip-gray-200 flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedChatId(null)}
                    className="lg:hidden"
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback className="bg-vip-blue text-white">
                      {selectedChat.isGroup ? (
                        <Icon name="Users" size={16} />
                      ) : (
                        selectedChat.name.split(' ').map(n => n[0]).join('')
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-vip-gray-900">{selectedChat.name}</h3>
                    <p className="text-sm text-vip-gray-500">
                      {selectedChat.isGroup ? 'Группа' : 'В сети'}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {selectedChat.messages.length > 0 ? (
                    selectedChat.messages.map(message => renderMessage(message))
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="MessageCircle" size={48} className="mx-auto text-vip-gray-300 mb-4" />
                      <p className="text-vip-gray-500">Напишите первое сообщение</p>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-vip-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Введите сообщение..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          sendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={sendMessage}
                      className="bg-vip-blue hover:bg-vip-purple text-white"
                      disabled={!newMessage.trim()}
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              // List View
              <div className="space-y-6">
              {/* Search Bar */}
              <Card className="p-4">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-400" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      <Button 
                        onClick={addNewChat}
                        className="bg-vip-blue hover:bg-vip-purple text-white"
                      >
                        <Icon name="Plus" size={20} className="mr-2" />
                        Новый чат
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {filteredChats.length > 0 ? (
                        filteredChats.map(chat => renderChatItem(chat, deleteChat))
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
                      <Button 
                        onClick={addNewGroup}
                        className="bg-vip-purple hover:bg-vip-blue text-white"
                      >
                        <Icon name="Users" size={20} className="mr-2" />
                        Создать группу
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {filteredGroups.map(group => renderChatItem(group))}
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
                      {filteredContacts.map(contact => renderContactItem(contact))}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipMinApp;