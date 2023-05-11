from random import choice as rc, randrange

from app import app
from models import db, User, Card, Collection


if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Card.query.delete()
        Collection.query.delete()

        print("Seeding users...")
        # users = [
        #     User(username="jimtensen", _password_hash="meowcat"),
        #     User(username="wizard", _password_hash="potato")
        # ]

        # db.session.add_all(users)

        print("Seeding cards...")
        cards = [
            Card(image_front="https://images4.imagebam.com/11/8e/8f/MEJAJKA_o.png", image_back="https://images4.imagebam.com/7e/93/45/MEJAJK5_o.png", athlete="Shohei Ohtani", year="2018", set="Topps", extra_info="Cyber Weekend Promo", card_num="2", card_grade=10, cert_num=63686660),
            Card(image_front="https://images4.imagebam.com/0a/18/64/MEJAJJW_o.png", image_back="https://images4.imagebam.com/20/67/65/MEJAJJR_o.png", athlete="Juan Soto", year="2018", set="Topps Brooklyn Collection", extra_info="Autographs", card_num="JSO", card_grade=10, cert_num=45760084),
            Card(image_front="https://images4.imagebam.com/98/8f/50/MEJAJK3_o.png", image_back="https://images4.imagebam.com/8e/f2/c0/MEJAJK0_o.png", athlete="Ken Griffey Jr.", year="1991", set="Score", extra_info="", card_num="697", card_grade=10, cert_num=58997370),
            Card(image_front="https://images4.imagebam.com/20/84/e0/MEJAJKI_o.png", image_back="https://images4.imagebam.com/82/7c/1a/MEJAJKD_o.png", athlete="Tyrese Haliburton", year="2020", set="Donruss Optic", extra_info="Purple", card_num="162", card_grade=10, cert_num=66029880),
        ]

        db.session.add_all(cards)

        print("Seeding collections...")
        # collections = []
        # for card in cards:
        #     user = rc(users)
        #     collections.append(
        #         Collection(card=card, user=user, name="")
        #     )
        # db.session.add_all(collections)
        db.session.commit()

        print("Done seeding!")
