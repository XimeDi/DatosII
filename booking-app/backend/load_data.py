import pandas as pd
from app import db
from models import Book, Review
from sqlalchemy.exc import IntegrityError
import ast

# Cargar libros
def load_books_data():
    books_df = pd.read_csv('books_data.csv')

    for _, row in books_df.iterrows():
        try:
            # Convertir los campos de listas en formato adecuado
            authors = ast.literal_eval(row['authors']) if pd.notna(row['authors']) else []
            categories = ast.literal_eval(row['categories']) if pd.notna(row['categories']) else []

            book = Book(
                title=row['Title'],
                description=row['description'],
                authors=', '.join(authors) if authors else '',  # Convierte la lista en una cadena
                image=row['image'],
                previewLink=row['previewLink'],
                publisher=row['publisher'],
                publishedDate=row['publishedDate'],
                infoLink=row['infoLink'],
                categories=', '.join(categories) if categories else ''  # Convierte la lista en una cadena
            )
            db.session.add(book)  # Añadir libro

        except Exception as e:
            print(f"Error adding book: {e}")

    db.session.commit()  # Guardar cambios

# Cargar reseñas
def load_reviews_data():
    reviews_df = pd.read_csv('books_rating.csv')

    for _, row in reviews_df.iterrows():
        try:
            review = Review(
                book_id=row['Id'],
                user_id=row['User_id'],
                summary=row['review/summary'],
                text=row['review/text']
            )
            db.session.add(review)

        except Exception as e:
            print(f"Error adding review: {e}")

    db.session.commit()

# Solo se ejecuta si se ejecuta directamente, no como módulo
if __name__ == '__main__':
    db.create_all()  # Crea las tablas si no existen
    load_books_data()
    load_reviews_data()
    print('Data loaded successfully.')
