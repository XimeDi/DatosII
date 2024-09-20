FROM python:3.9

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Copia los archivos CSV al contenedor
COPY books_data.csv books_rating.csv /app/

CMD ["flask", "run", "--host=0.0.0.0"]
