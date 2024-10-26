from app import app,db,bcrypt,socketio
from flask import request, jsonify,session
from models import Room,User,user_room, Message
from flask_socketio import join_room,leave_room,send




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
            'userId':user.id,
            "username":user.username
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
        username = user["username"]
        return jsonify({"userId":userId,"username":username}),200
        
    
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

        
        return jsonify({"userId":new_user.id,"msg":"user created successfuly!"}),200



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
    

@app.route("/api/joinroom",methods=["POST"])
def join_room_route():
    data = request.json
    room_id= data.get("id")
    user_id = data.get("userId")
    room = Room.query.filter_by(id=room_id).first()

    if not room:
        return jsonify({"error":"Room does not exist"}),400

    user = User.query.filter_by(id=user_id).first()

    if user not in room.users:
        room.users.append(user)

    if room not in user.rooms:
        user.rooms.append(room)

    db.session.commit()



    return jsonify({
        "msg":"Success!",
        'roomName':room.name}),201
    
@app.route('/api/view/<int:user_id>/rooms', methods=["GET"])
def view_rooms(user_id):
    user = User.query.get(user_id)
    

    if not user:
        return jsonify({"error":"User not found"}),404

    rooms = user.rooms
    room_data = [{
        "id":room.id,
        "name":room.name,
        "description":room.description
    } for room in rooms]

    return jsonify({
        "rooms":room_data 
    }),200


    
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(f"{username} has joined the room",to=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(f"{username} has left the room.",to=room)

@socketio.on('message')
def handle_message(data):
    room_id = data['room']
    username = data['username']
    msg = data['msg']

    room = Room.query.get(room_id)

    if room is None:
        return jsonify({
            "error":"room does not exist"
        })
    
    user = User.query.filter_by(username=username).first()
    
    if user:
        new_message = Message(room_id = room.id, user_id = user.id, msg=msg)
        db.session.add(new_message)
        db.session.commit()
    # Send message to the room with the username included
    
        socketio.emit('message', {'username': username, 'msg': msg}, room=room)


@app.route('/api/rooms/<int:room_id>/messages', methods=['GET'])
def get_room_messages(room_id):
    try:

        messages = Message.query.filter_by(room_id=room_id).all()
        result = [message.to_json() for message in messages]
        return jsonify(result),200
    
    except Exception as e:
        return jsonify({"error":str(e)}),500

