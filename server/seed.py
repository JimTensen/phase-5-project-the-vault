#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db


with app.app_context():
    # User.query.delete()
    # Card.query.delete()
    # Collection.query.delete()

    u1= User(username = "Tim", password= "virginia")
    users = [u1]

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        User.query.delete()
        Card.query.delete()
        Collection.query.delete()
        print("Starting seed...")
        db.session.add_all(users)
        print("Users added...")
        db.session.add_all(cards)
        print("Cards added...")
        db.session.add_all(collections)
        print("Collections added...")
        db.session.commit()
        print("Finished!")
        # Seed code goes here!
