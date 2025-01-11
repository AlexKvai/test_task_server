# Тестовое задание Парфенова Алексея

Резюме - https://novosibirsk.hh.ru/resume/aa7207d2ff0e2ee02a0039ed1f464367706255

# Руководство по установке

# Необходимо склонировать репозиторий

```bash
git clone <ссылка на репозиторий>
cd <папка>
```

# Затем установить необходимые библиотеки

```bash
npm i
```

# Заполните env

Пример в .env.example

# Создайте базу данных и затем пропишите

```bash
npx prisma migrate dev --name add_cascade_delete
```

# Заполните базу данных с помощью команды

```bash
npm run db:seed
```

# Запустите сервер с помощью команды

```bash
npm run dev
```

Сервер будет доступен по адресу: http://localhost:3000, если вы поставите в .env порт 3000 или он поставится по умолчанию, если вы его не укажете

# Создайте тестового юзера с помощью АПИ

# API Documentation

## Categories API

### Создание новой категории

- **URL:** `/categories/create`
- **Method:** `POST`
- **NeedAuth:** `False`
- **Description:** Создание новой категории.
- **Request Body:**
  ```json
  {
  	"name": "string"
  }
  ```
- **Response:**
  ```json
  {
  	"id": "number",
  	"name": "string"
  }
  ```

### Получение категории по id

- **URL:** `/categories/:id`
- **Method:** `GET`
- **NeedAuth:** `False`
- **Description:** Получение категории по id .
- **Request Params:**
  ```json
   id (number): ID категории.
  ```
- **Response:**

  ```json
  {
  	"id": "number",
  	"name": "string"
  }
  ```

  ### Получение всех категорий

- **URL:** `/categories/`
- **Method:** `GET`
- **NeedAuth:** `False`
- **Description:** Получение всех категорий
- **Response:**
  ```json
  [
  	{
  		"id": "number",
  		"name": "string"
  	}
  ]
  ```

## Statuses API

### Создание нового статуса

- **URL:** `/status/create`
- **Method:** `POST`
- **NeedAuth:** `False`
- **Description:** Создание нового статуса.
- **Request Body:**
  ```json
  {
  	"name": "string"
  }
  ```
- **Response:**
  ```json
  {
  	"id": "number",
  	"name": "string"
  }
  ```

### Получение статуса по id

- **URL:** `/statuses/:id`
- **Method:** `GET`
- **NeedAuth:** `False`
- **Description:** Получение статуса по id .
- **Request Params:**
  ```json
   id (number): ID категории.
  ```
- **Response:**

  ```json
  {
  	"id": "number",
  	"name": "string"
  }
  ```

  ### Получение всех статусов

- **URL:** `/categories/`
- **Method:** `GET`
- **NeedAuth:** `False`
- **Description:** Получение всех статусов
- **Response:**

  ```json
  [
  	{
  		"id": "number",
  		"name": "string"
  	}
  ]
  ```

## Upvotes API

### Создание голоса

- **URL:** `/upvotes/:id`
- **Method:** `POST`
- **NeedAuth:** `True`
- **Description:** Проголосовать за выбранное предложение
- **Request Params:**
  ```json
   id (number): ID предложения.
  ```
- **Response:**

  ```json
  {
  	"isVoted": true
  }
  ```

## Users API

### Регистрация

Стоит валидация на mail и пароль минимальную длину - 3 символа

- **URL:** `/users/register`
- **Method:** `POST`
- **NeedAuth:** `False`
- **Description:** Регистрация нового пользователя
- **Request Body:**
  ```json
  {
  	"email": "string",
  	"password": "string",
  	"avatar": "string"
  }
  ```
- **Response:**
  ```json
  {
  	"id": "number",
  	"email": "string",
  	"avatar": "string"
  }
  ```

### Авторизация

- **URL:** `/users/login`
- **Method:** `POST`
- **NeedAuth:** `False`
- **Description:** Авторизация
- **Request Body:**
  ```json
  {
  	"email": "string",
  	"password": "string"
  }
  ```
- **Response:**

  ```json
  {
  	"token": "string"
  }
  ```

  ### Получение профиля

- **URL:** `/users/profile`
- **Method:** `GET`
- **NeedAuth:** `True`
- **Description:** Получение профиля
- **Response:**
- **Необходим Bearer Token для получения профиля:**
  ```json
  {
  	"id": "number",
  	"email": "string",
  	"avatar": "string"
  }
  ```

## Feedback API

### Создание предложения

- **URL:** `/feedbacks`
- **Method:** `POST`
- **NeedAuth:** `True`
- **Description:** Создание предложения
- **Request Body:**
- **Id автора берется из Bearer Token, т.к. только зарегистрированный пользователь может создать предложение:**
  ```json
  {
  	"title": "string",
  	"description": "string",
  	"categoryId": 2,
  	"statusId": 2
  }
  ```
- **Response:**
  ```json
  {
  	"id": "number",
  	"title": "string",
  	"description": "string",
  	"categoryId": "number",
  	"statusId": "number",
  	"authorId": "number",
  	"votesCount": "number",
  	"createdAt": "date",
  	"updatedAt": "date"
  }
  ```

### Обновление предложения

- **URL:** `/feedbacks/:id`
- **Method:** `PUT`
- **NeedAuth:** `True`
- **Description:** Обновление предложения
- **Request Body:**
- **Id автора берется из Bearer Token, т.к. только зарегистрированный пользователь может создать предложение:**
  ```json
  {
  	"title": "string",
  	"description": "string",
  	"categoryId": 2,
  	"statusId": 2
  }
  ```
- **Response:**

  ```json
  {
  	"id": "number",
  	"title": "string",
  	"description": "string",
  	"categoryId": "number",
  	"statusId": "number",
  	"authorId": "number",
  	"votesCount": "number",
  	"createdAt": "date",
  	"updatedAt": "date"
  }
  ```

  ### Удаление предложения

- **URL:** `/feedbacks/:id`
- **Method:** `DELETE`
- **NeedAuth:** `True`
- **Description:** Получение профиля
- **Response Params:**
  ```json
  id
  ```
- **Response:**

  ```json
  {
  	"isDeleted": true
  }
  ```

  ### Получение всех предложений

- **URL:** `/feedbacks`
- **Method:** `GET`
- **NeedAuth:** `False`
- **Description:** Получение всех предложений
- **Response Params:**
  ```json
  category - id категории (необязательный)
  status - id статуса (необязательный)
  sort - поля по которым необходимо сортировать через запятую, если несколько (createdAt,votesCount - пример) (необязательный)
  sortType - asc или desc (необязательный)
  page - номер страницы  (необязательный - по умолчанию 1)
  limit - количество элементов на странице  (необязательный - по умолчанию 10)
  ```
- **Response:**

  ```json
  [
  	{
  		"id": number,
  		"title": "string",
  		"description": "string",
  		"category": {
  			"name": "string"
  		},
  		"status": {
  			"name": "string"
  		},
  		"votesCount": "number",
  		"createdAt": "date"
  	}
  ]
  ```
