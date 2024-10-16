from app import app,db
from flask import request, jsonify
from models import Room,User
from app import bcrypt



# Create room
@app.route('/api/rooms',methods=["GET"])
def get_rooms():
    rooms = Room.query.all()
    result = [room.to_json() for room in rooms]
    return jsonify(result)

@app.route('/api/rooms',methods=["POST"])
def create_room():
    try:
        data = request.json

        name = data.get("name")
        description = data.get("description")

        new_room = Room(name=name,description=description)
        db.session.add(new_room)
        db.session.commit()

        return jsonify({"msg":"Room Created"}),201



    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    

@app.route('/api/users', methods=["GET"])
def get_users():
    users = User.query.all()
    result = [user.to_json() for user in users]
    return jsonify(result)

@app.route('/api/users',methods=["POST"])
def create_user():
    try:
        data = request.json
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(username=username,email=email,password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg":"user created successfully"}),201
    
    except:
        return jsonify({"error":"Username or Email taken!"}),500
    
def get_user_from_db(email):
    user = User.query.filter_by(email=email).first()
    if user:
        return {
            'email':user.email,
            'password':user.password,
            'userId':user.id
        }
    return None
        

    
    
@app.route('/api/login', methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    

    user = get_user_from_db(email)
    hashed_password = user['password']
    
    if user and bcrypt.check_password_hash(hashed_password,password):
        userId = user['userId']
        return jsonify({"userId":userId}),200
        
    
    else:
        return jsonify({"error":"Please check username or password"}),401
    
@app.route('/api/register',methods=["POST"])
def register_user():
    try:
        data = request.json
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        print ("new user",username,email,hashed_password)
        new_user= User(username=username,email=email,password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        
        return jsonify({"msg":"user created successfuly!"}),200



    except Exception as e:
        return jsonify({"error":str(e)}),500


@app.route('/api/add/room',methods=["POST","GET"])
def add_room():
    try:
        data = request.json
        name = data.get("name")
        description = data.get("description")
        user_id = data.get("userId")

        if not user_id:
            return jsonify({"error": "user id not provided"}),400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error":"user not found"})
       
        new_room = Room(name=name,description=description)

        new_room.users.append(user)

        db.session.add(new_room)

        db.session.commit()
        room_data = new_room.to_json()
        

        return jsonify({"msg":"Room added successfully!","room": room_data}),201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    


@app.route('/api/viewrooms', methods=["GET"])
def view_rooms():
    pass



