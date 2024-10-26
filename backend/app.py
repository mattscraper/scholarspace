
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room,leave_room,send
from flask_migrate import Migrate


app = Flask(__name__)
bcrypt= Bcrypt(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app,db)
socketio = SocketIO(app, cors_allowed_origins="*")
from routes import *

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
