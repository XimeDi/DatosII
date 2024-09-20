#api, metodos post y get

from flask import request, jsonify
from app import app, db
from models import User, Book, Review


#devuelve lista de los libros en la base de datos
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'description': book.description,
        'authors': book.authors,
        'image': book.image,
        'previewLink': book.previewLink,
        'publisher': book.publisher,
        'publishedDate': book.publishedDate,
        'infoLink': book.infoLink,
        'categories': book.categories
    } for book in books]), 200

#añadir reseña
@app.route('/books/<int:book_id>/reviews', methods=['POST'])
def add_review(book_id):
    data = request.json
    review = Review(
        book_id=book_id,
        user_id=data['user_id'],
        summary=data['summary'],
        text=data['text']
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully'}), 201

#buscar libros
@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.authors.ilike(f'%{query}%')) |
        (Book.categories.ilike(f'%{query}%'))
    ).all()

    return jsonify([{
        'id': book.id,
        'title': book.title,
        'description': book.description,
        'authors': book.authors,
        'image': book.image,
        'previewLink': book.previewLink,
        'publisher': book.publisher,
        'publishedDate': book.publishedDate,
        'infoLink': book.infoLink,
        'categories': book.categories
    } for book in books]), 200


#registrar usuario
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
    user = User(username=data['username'], password=data['password'], is_author=data['is_author'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


#login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username, 'is_author': user.is_author}}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'description': book.description,
        'authors': book.authors,  # Autores ahora están en formato de cadena
        'image': book.image,
        'previewLink': book.previewLink,
        'publisher': book.publisher,
        'publishedDate': book.publishedDate,
        'infoLink': book.infoLink,
        'categories': book.categories  # Categorías ahora están en formato de cadena
    } for book in books]), 200