from app.models import db, User, Tasting, Discussion



def seed_tasting():

  user1 = User(username='Markie', email='mark@gmail.com', password='password', profile_image='https://images.pexels.com/photos/15865898/pexels-photo-15865898/free-photo-of-man-with-cigarette-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers=[], following=[])
  user2 = User(username='Gary', email='gary@gmail.com', password='password', profile_image='https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers=[], following=[user1])
  user3 = User(username='Ronnie', email='ron@gmail.com', password='password', profile_image='https://images.pexels.com/photos/1975342/pexels-photo-1975342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers=[user1, user2], following=[user1])


  db.session.add(user1)
  db.session.add(user2)
  db.session.add(user3)


  tasting1 = Tasting(
    producer='Arnot Roberts',
    region='Northern coast of California',
    vineyard='N/A',
    varietal='Trousseau Noir',
    vintage=2018,
    color='Red',
    label_image='https://www.wine-searcher.com/images/labels/82/14/11428214.jpg',
    other_info='Small production, 26 barrels',
    sight='Ruby, legs move quickly... low alcohol, no evidence of sediment',
    nose='Fresh Raspberries, currants, granite',
    palate='Red berries, bright acid, very fine tannin',
    thoughts='Easy drink, sunny day "Park" wine',
    love=True,
    user=user1,
    tasting_cheers=[user2, user3]
  )

  tasting2 = Tasting(
    producer='Knoll',
    region='Wachau, Austria',
    vineyard='Ried Kreutles',
    varietal='Gruner Veltliner',
    vintage=2016,
    color='White',
    label_image='https://images.vivino.com/thumbs/w2WXtVQlRxSPYwQgy8YgBQ_pb_600x600.png',
    other_info='Federspiel',
    sight='Star Bright, straw, maybe amber',
    nose='Stone Fruit, white Flowers, Almond',
    palate='Vegetal and a bit floral...  Screaming acid',
    thoughts='I wanna eat some Cacio Pepe with this',
    love=True,
    user=user1,
    tasting_cheers=[user2]
  )

  tasting3 = Tasting(
    producer='Fratelli Alessandria',
    region='Verduno, Italy',
    vineyard='N/A',
    varietal='Pelaverga Piccolo',
    vintage=2019,
    color='Red',
    label_image='https://shop.thewinethief.com/images/sites/thewinethief/labels/fratelli-alessandria-speziale-pelaverga-verduno_1.jpg',
    other_info='DOC, indigenous to the region',
    sight='Garnet, very light bodied, some fine bubbles present',
    nose='under ripe strawberry, potting soil',
    palate='High acid, suprisingly firm tannin, fruit consisten with nose',
    thoughts='Would be great with pizza',
    love=False,
    user=user2,
    tasting_cheers=[user1]
  )


  db.session.add(tasting1)
  db.session.add(tasting2)
  db.session.add(tasting3)


  comment1 = Discussion(
    comment = "You make me want to try this!",
    user = user3,
    tastings = tasting1
  )

  comment2 = Discussion(
    comment = "I described it alright?",
    user = user1,
    tastings = tasting1
  )

  comment3 = Discussion(
    comment = "Where can I find this?",
    user = user2,
    tastings = tasting2
  )


  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)

  db.session.commit()


def undo_tasting():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()