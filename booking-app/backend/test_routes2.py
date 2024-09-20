import pytest
from app import app, db
from models import Book

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_books(client):
    # Agregar datos de prueba si es necesario
    book = Book(title="Dr. Seuss: American Icon", description="Philip Nel takes a fascinating look into the key aspects of Seuss's career - his poetry, politics, a...", authors="Philip Nel", categories="Fiction, Adventure")
    db.session.add(book)
    db.session.commit()
    
    response = client.get('/books')
    assert response.status_code == 200
    assert b'Sample Book' in response.data  # Busca la cadena en lugar de la lista
    assert b'Author Name' in response.data
    assert b'Fiction, Adventure' in response.data



#python -m unittest test_routes2.py