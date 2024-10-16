from app import bcrypt, db



user_room = db.Table('user_room',
                    db.Column('user_id',db.Integer, db.ForeignKey('user.id')),
                    db.Column('room_id',db.Integer, db.ForeignKey('room.id'))
)

class Room(db.Model):
    __tablename__ = "room"
    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text, nullable = False)
    
    users = db.relationship('User', secondary=user_room,backref='rooms')
    

    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "users":[user.id for user in self.users]
        }

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer(),primary_key=True)
    username = db.Column(db.String(80), unique= True, nullable=False)
    email = db.Column(db.String(80), unique= True, nullable=False)
    password = db.Column(db.String(200),nullable=False)
    
   

    def to_json(self):
        return {
            "id":self.id,
            "username":self.username,
            "email":self.email,
            "password":self.password,
            "rooms":[room.to_json() for room in self.rooms]
        }