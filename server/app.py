from flask import Flask, make_response, request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Card, Collection


@app.route('/')
def index():
    return '<h1>Back-End Home</h1>'

class ClearSession(Resource):
    def delete(self):
        session['page_views'] = None
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)
api.add_resource(ClearSession, '/clear', endpoint='clear')

class SignUp(Resource):
    def post(self): 
        username = request.get_json()['username']
        password = request.get_json()['password']
        if username and password:            
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        return make_response({'error': '422 Unprocessable Entity'}, 422)
api.add_resource(SignUp, '/signup')
        
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()            
            return user.to_dict(), 200
        return make_response({'message': '204: No Content'}, 204)
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        return {'error': 'Invalid username or password'}, 401

    # what I came up with, wrong
    # def post(self):
    #     username = request.get_json()['username']
    #     user = User.query.filter(User.username == username)

    #     password = request.get_json()['password_hash_']

    #     if user.authenticate(password):
    #         session['user_id'] = user.id
    #         return user.to_dict(), 200

    #     return {'error': 'Invalid username or password'}, 401
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
api.add_resource(Logout, '/logout')

# class Users(Resource):
#     def get(self):
#         u_list=[]
#         for u in User.query.all():
#             u_dict={
#                 'id': u.id,
#                 'username': u.username,
#                 'password': u.password,
#                 'first_name': u.first_name,
#                 'last_name': u.last_name,
#                 'email': u.email
#             }
#             u_list.append(u_dict)
#         return make_response(u_list, 200)

# api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        if user == None:
            return make_response({'error': 'user not found'}, 404)
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter_by(id = id).first()
        if user == None:
            return make_response({'error': 'user not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response('poof!', 200)
    
    # def patch(self, id):
    #     user = User.query.filter_by(id = id).first()
    #     data = request.get_json()
    #     for attr in data:
    #         setattr(user, attr, data[attr])
    #         db.session.add(user)
    #         db.session.commit()
    #         return make_response(user.to_dict(), 201)
api.add_resource(UsersById, '/users/<int:id>')


class Cards(Resource):
    def get(self):
        c_list = []
        for c in Card.query.all():
            c_dict={
                'id': c.id,
                'image': c.image,
                'athlete': c.athlete,
                'year': c.year,
                'set': c.set,
                'extra_info': c.extra_info,
                'card_num': c.card_num,
                'card_grade': c.card_grade,
                'cert_num': c.cert_num
            }
            c_list.append(c_dict)
        return make_response (c_list, 200)
    
    def post(self):
        data=request.get_json()
        try:
            new_card = Card (
                image = data['image'],
                athlete = data['athlete'],
                year = data['year'],
                set = data['set'],
                extra_info = data['extra_info'],
                card_num = data['card_num'],
                card_grade = data['card_grade'],
                cert_num = data['cert_num']
            )
        except ValueError:
            return make_response({'error': 'must be valid card'}, 404)
        db.session.add(new_card)
        db.session.commit()
        return make_response(new_card.to_dict(), 201)
api.add_resource(Cards, '/cards')


class CardsById(Resource):
    def get(self, id):
        card = Card.query.filter_by(id = id).first()
        if card == None:
            return make_response({'error': 'card not found'}, 404)
        return make_response(card.to_dict(), 200)
    
    def delete(self, id):
        card = Card.query.filter_by(id = id).first()
        if card == None:
            return make_response({'error': 'card not found'}, 404)
        db.session.delete(card)
        db.session.commit()
        return make_response('poof!', 200)
    
    def patch(self, id):
        card = Card.query.filter_by(id = id).first()
        data = request.get_json()
        for attr in data:
            setattr(card, attr, data[attr])
            db.session.add(card)
            db.session.commit()
            return make_response(card.to_dict(), 201)
api.add_resource(CardsById, '/cards/<int:id>')


class Collections(Resource):
    def get(self):
        col_list = []
        for col in Collection.query.all():
            col_dict={
                'id': col.id,
                'name': col.name,
                'user_id': col.user_id,
                'card_id': col.card_id
            }
            col_list.append(col_dict)
        return make_response (col_list, 200)
    
    def post(self):
        data = request.get_json
        try:
            new_collection = Collection(
                name = data['name'],
                user_id = data['user_id'],
                card_id = data['card_id']
            )
        except ValueError:
            return make_response({'error': 'must be a valid collection'}, 404)
        db.session.add(new_collection)
        db.session.commit()
        return make_response(new_collection.to_dict(), 201)
api.add_resource(Collections, "/collections")


class CollectionsById(Resource):
    def get(self, id):
        collection = Collection.query.filter_by(id = id).first()
        if collection == None:
            return make_response({"error": "collection not found"}, 404)
        return make_response(collection.to_dict(), 200)
    
    def delete(self, id):
        collection = Collection.query.filter_by(id = id).first()
        if collection == None:
            return make_response({"error": "collection not found"}, 404)
        db.session.delete(collection)
        db.session.commit()
        return make_response({"poof!"}, 204)
    
    def patch(self, id):
        collection = Collection.query.filter_by(id = id).first()
        data = request.get_json()
        for attr in data:
            setattr(collection, attr, data[attr])
        db.session.add(collection)
        db.session.commit()
        return make_response(collection.to_dict(), 201)
api.add_resource(CollectionsById, "/collections/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)