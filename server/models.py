from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin


from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ ='users'
    serialize_rules= ('-created_at', '-updated_at', '-collections')
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    collections = db.relationship('Collection', backref = 'user', cascade = 'all, delete-orphan')
    cards = association_proxy('collections', 'card')

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrpyt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, username):
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError('Username is already taken')
        if not username:
            raise ValueError('Username must be present')
        if len(username) >= 20:
            raise ValueError('Username must be shorter than 20 characters')
        return username


class Card(db.Model, SerializerMixin):
    __tablename__ ='cards'
    serialize_rules= ('-created_at', '-updated_at', '-collections')
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    athlete = db.Column(db.String)
    year = db.Column(db.Integer)
    set = db.Column(db.String)
    extra_info = db.Column(db.String)
    card_num = db.Column(db.String)
    card_grade = db.Column(db.Integer, nullable=False)
    cert_num = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    collections = db.relationship('Collection', backref = 'card', cascade = 'all, delete-orphan')
    users = association_proxy('collections', 'user')

    @validates('card_grade')
    def validate_rating(self, key, grade_num):
        if not (1 <= grade_num <= 10):
            raise ValueError('grade must be between 1 and 10!')
        return grade_num
    

class Collection(db.Model, SerializerMixin):
    __tablename__ ='collections'
    serialize_rules= ('-created_at', '-updated_at', '-cards', '-users')
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())  


