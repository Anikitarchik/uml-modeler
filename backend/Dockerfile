# Используем базовый образ python
FROM python:3.8-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt и устанавливаем зависимости
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Копируем исходный код в рабочую директорию
COPY . .

# Указываем команду для запуска приложения
CMD ["flask", "run", "--host=0.0.0.0"]
