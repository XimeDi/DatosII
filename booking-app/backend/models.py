#modelos de datos de las entidades principales y sus relaciones

from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    is_author = db.Column(db.Boolean, default=False)
    reviews = db.relationship('Review', backref='author', lazy=True)
    books = db.relationship('Book', secondary='user_books', backref='users')

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    authors = db.Column(db.String(150))
    image = db.Column(db.String(200))
    previewLink = db.Column(db.String(200))
    publisher = db.Column(db.String(150))
    publishedDate = db.Column(db.String(20))
    infoLink = db.Column(db.String(200))
    categories = db.Column(db.String(150))

    def __repr__(self):
        return f'<Book {self.title}>'
    #manda el libro en cadena

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    text = db.Column(db.Text, nullable=False)

class UserBooks(db.Model):
    __tablename__ = 'user_books'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), primary_key=True)


