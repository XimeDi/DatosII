from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__) #instancia de plask
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db' #url base de datos que SQLALCHEMY usara, base de datos book.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #desactiva seguimiento de modificaciones de objeto

#inicializa extensiones
db = SQLAlchemy(app) #en flask, getionar base de dato
migrate = Migrate(app, db) #flask migrate e instancia, agregar eliminat tablas o columnas

from routes import * #todas las rutas definidas

#ejecuta aplicacion
if __name__ == '__main__':
    app.run(debug=True)

