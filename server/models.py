from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ ='users'
    serialize_rules= ('-created_at', '-updated_at')
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    collections = db.relationship('Collection', backref = 'user', cascade = 'all, delete-orphan')
    cards = association_proxy('collections', 'card')


class Card(db.Model, SerializerMixin):
    __tablename__ ='cards'
    serialize_rules= ('-created_at', '-updated_at')
    id = db.Column(db.Integer, primary_key=True)
    athlete = db.Column(db.String)
    year = db.Column(db.Integer)
    set = db.Column(db.String)
    extra_info = db.Column(db.String)
    card_num = db.Column(db.Integer)
    card_grade = db.Column(db.Integer, nullable=False)
    cert_num = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    collections = db.relationship('Collection', backref = 'card', cascade = 'all, delete-orphan')
    users = association_proxy('collections', 'user')

    @validates('card_grade')
    def validate_rating(self, key, grade):
        if not (1 <= grade <= 10):
            raise ValueError('grade must be between 1 and 10!')
        return grade
    

class Collection(db.Model, SerializerMixin):
    __tablename__ ='collections'
    serialize_rules= ('-created_at', '-updated_at')
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())  


